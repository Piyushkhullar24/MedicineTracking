
using System;

namespace MedicineTracking.CustomExceptions
{
    public class FileException: Exception
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="httpStatusCode"></param>
        /// <param name="message"></param>
        public FileException(string message) : base(message)
        {
        }
    }
}
