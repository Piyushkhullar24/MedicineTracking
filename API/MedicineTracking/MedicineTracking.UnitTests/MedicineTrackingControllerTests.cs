using MedicineTracking.Controllers;
using MedicineTracking.Models;
using MedicineTracking.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace MedicineTracking.UnitTests
{
    public class MedicineTrackingControllerTests
    {
        private readonly MedicineTrackingController _medicineTrackingController;
        private readonly Mock<IFileService> _mockFileService;

        public MedicineTrackingControllerTests()
        {
            _mockFileService = new Mock<IFileService>();

            _medicineTrackingController = new MedicineTrackingController(_mockFileService.Object);
        }

        [Fact]
        public async void Task_GetMedicine()
        {
            //Act  
            var data = await _medicineTrackingController.GetMedicine() as OkObjectResult;

            //Assert
            Assert.NotNull(data);
        }

        [Fact]
        public async void Task_GetMedicineByFullName()
        {
            //Act  
            var data = await _medicineTrackingController.GetMedicineByFullName("Medicine") as OkObjectResult;

            //Assert
            Assert.NotNull(data);
        }

        [Fact]
        public async void Task_PostMedicine()
        {  
            //Arrange
            var medicine = new Medicine();
            _mockFileService.Setup(x => x.WriteJsonFileAsync(It.IsAny<Medicine>())).Returns(Task.CompletedTask);

            //Act  
            var data = await _medicineTrackingController.Post(medicine) as OkResult; 

            //Assert
            Assert.Equal(StatusCodes.Status200OK, data.StatusCode);
        }

    }
}
