using System.ComponentModel.DataAnnotations;

namespace HolidayManagement.Repository.Models
{
    public class BankHoliday
    {
        [Key]
        public int ID { get; set; }

        public string Description { get; set; }

        public int Day { get; set; }

        public int Month { get; set; } 
    }
}
