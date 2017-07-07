using HolidayManagement.Repository.Models;
using System.Collections.Generic;

namespace HolidayManagement.Repository.Interfaces
{
    public interface IVacationRepository
    {
        Vacation GetVacationById(int id);

        List<Vacation> GetVacations();
    }
}
