using HolidayManagement.Models;
using HolidayManagement.Repository;
using HolidayManagement.Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HolidayManagement.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        public  UserDetailsRepository database= new UserdetailsRepository();
        public TeamRepository db = new TeamRepository();
        HolidayManagementContext newdb = new HolidayManagementContext();

        // GET: Dashboard
        public ActionResult Index()
        {
            var users = database.GetUsers();
            var teams = db.GetTeams();
            var roles = newdb.Roles.ToList();
            DashboardViewModel dash = new DashboardViewModel()
            {
                UserList = users,
                TeamList = teams,
                Roles = roles
            };
            return View(dash);
        }
       
    }
}