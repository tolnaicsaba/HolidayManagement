using HolidayManagement.Repository.Models;
using System.Collections.Generic;

namespace HolidayManagement.Repository.Interfaces
{
    public interface IVacationStateRepository
    {
        VacationState GetVacationStateById(int id);

        List<VacationState> GetVacationStates();
    }
}
