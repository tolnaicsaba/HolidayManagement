using HolidayManagement.Repository.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace HolidayManagement.Repository
{
    public class HolidayManagementContext: DbContext
    {
        public HolidayManagementContext() : base("name=HolidayManagementContext")
        {
            Database.SetInitializer(new HolidayManagementInitializer());
        }

        public DbSet<UserDetails> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<BankHoliday> BankHolidays { get; set; }
        public DbSet<Vacation> Vacations { get; set; }
        public DbSet<VacationState> VacationStates { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();            
        }

        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(string.Empty, ex);
            }
        }
    }
}
