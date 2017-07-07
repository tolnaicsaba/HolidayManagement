using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HolidayManagement.Repository.Interfaces
{
    public interface IBankHolidayRepository
    {
        BankHoliday GetBankHolidayById(int id);

        List<BankHoliday> GetBankHolidays();
    }
}
