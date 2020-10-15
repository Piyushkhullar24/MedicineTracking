using MedicineTracking.CustomExceptions;
using MedicineTracking.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTracking.Services
{
    public interface IFileService
    {
        Task<IEnumerable<Medicine>> ReadJsonFileAsync();

        Task WriteJsonFileAsync(Medicine medicine);
    }

    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public FileService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<Medicine>> ReadJsonFileAsync()
        {
            var folderDetails = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot\\{"JSON\\Medicine.json"}");
            var JSON = await System.IO.File.ReadAllTextAsync(folderDetails);
            var result = JsonConvert.DeserializeObject<IEnumerable<Medicine>>(JSON);
            return result;
        }

        public async Task WriteJsonFileAsync(Medicine medicine)
        {
            try
            {
                JObject obj = (JObject)JToken.FromObject(medicine);
                string uploadFile = Path.Combine(_webHostEnvironment.WebRootPath, "Json");

                var fileName = "Medicine.json";

                string filePath = Path.Combine(uploadFile, fileName);

                var getMedicines = await ReadJsonFileAsync();
                if (getMedicines == null)
                {
                    getMedicines = new List<Medicine>();
                }

                var addList = getMedicines.ToList();
                addList.Add(medicine);
                var serialize = JsonConvert.SerializeObject(addList);

                await System.IO.File.WriteAllTextAsync(filePath,
                    serialize);
            }
            catch (Exception ex)
            {
                throw new FileException(ex.Message);
            }
        }
    }
}
