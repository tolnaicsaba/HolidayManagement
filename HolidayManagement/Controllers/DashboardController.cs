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
        // GET: Dashboard
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Users()
        {

            return PartialView("Users");
        }
        public ActionResult MyCalendar()
        {
            return PartialView("MyCalendar"); 
        }
        public ActionResult GroupManagement()
        {
            return PartialView("GroupManagement");
        }
        public ActionResult Settings()
        {
            return PartialView("Settings");
        }
    }
}