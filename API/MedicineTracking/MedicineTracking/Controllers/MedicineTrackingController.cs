using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicineTracking.CustomExceptions;
using MedicineTracking.Models;
using MedicineTracking.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicineTracking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineTrackingController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly ILogger<MedicineTrackingController> _logger;

        public MedicineTrackingController(IFileService fileService)
        {
            _fileService = fileService;
        }

        // GET: api/Medicine
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Medicine>), 200)]
        public async Task<IActionResult> GetMedicine()
        {
            var result = await _fileService.ReadJsonFileAsync();
            return Ok(result);
        }

        // GET: api/Medicine/5
        [HttpGet("{fullName}", Name = "Get")]
        public async Task<IActionResult> GetMedicineByFullName(string fullName)
        {
            var result = await _fileService.ReadJsonFileAsync();
            var filterResults = result.Where(s => s.FullName == fullName);
            return Ok(filterResults);
        }

        // POST: api/Medicine
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Medicine medicine)
        {
            if (medicine == null)
            {
                return BadRequest();
            }

            try
            {
                if (Math.Abs((medicine.ExpiryDate - DateTime.Now).TotalDays) < 15)
                {
                    return BadRequest("Expiry date is less than 15 days");
                }

                if (Math.Abs((medicine.ExpiryDate - DateTime.Now).TotalDays) < 30)
                {
                    medicine.Notes = "Expiry Date is less than 30 days";
                }

                await _fileService.WriteJsonFileAsync(medicine);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal Server Error");
                throw;
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
