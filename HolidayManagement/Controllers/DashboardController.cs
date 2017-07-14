using HolidayManagement.Models;
using HolidayManagement.Repository;
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
        
        // GET: Dashboard
        public ActionResult Index()
        {
            var users = database.GetUsers();
            var teams = db.GetTeams();
            DashboardViewModel dash = new DashboardViewModel()
            {
                UserList = users,
                TeamList = teams
            };
            
            return View(dash);
        }
       
    }
}