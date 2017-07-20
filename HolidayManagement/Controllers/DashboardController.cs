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
        public BankHolidayRepository bank = new BankHolidayRepository();
        public VacationRepository vakacio = new VacationRepository();
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
            CalendarViewModel Calendar = new CalendarViewModel()
            {
                BankHolidays = bank.GetBankHolidays(),
                Vacations = vakacio.GetVacations()
            };
            VacationRepository vakrep = new VacationRepository();
            var datum = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
            var free = vakrep.GetVacations();
            for (int i = 1; i < datum; ++i)
            {
                var date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, i);

                bool isFreeDay = date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;

                MonthDayViewModel day = new MonthDayViewModel()
                {
                    Day = i,
                    Name = date.DayOfWeek.ToString(),
                    IsFreeDay = isFreeDay
                };

                var vakacio = Calendar.BankHolidays.FirstOrDefault(x => x.Day == i && x.Month == DateTime.Now.Month);
                day.IsFreeDay = date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday || vakacio != null;
                day.Vacations = free.Where(x => DateTime.Compare(x.StartDate, date) <= 0 || DateTime.Compare(x.EndDate, date) >= 0).ToList();
                Calendar.MonthDays.Add(day);
            };
            dash.Calendar = Calendar;
            return View(dash);
        }
       
    }
}