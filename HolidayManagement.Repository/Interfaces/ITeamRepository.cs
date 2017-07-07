using HolidayManagement.Repository.Models;
using System.Collections.Generic;

namespace HolidayManagement.Repository.Interfaces
{
    public interface ITeamRepository
    {
        Team GetTeamById(int id);

        List<Team> GetTeams();        
    }
}
