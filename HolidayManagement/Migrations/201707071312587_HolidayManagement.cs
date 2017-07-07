namespace HolidayManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class HolidayManagement : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BankHoliday",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Day = c.Int(nullable: false),
                        Month = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Team",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.UserDetails",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        HireDate = c.DateTime(nullable: false),
                        MaxDays = c.Int(nullable: false),
                        TeamId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Team", t => t.TeamId, cascadeDelete: true)
                .Index(t => t.TeamId);
            
            CreateTable(
                "dbo.Vacation",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        StateId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        Date = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.VacationState", t => t.StateId, cascadeDelete: true)
                .Index(t => t.StateId);
            
            CreateTable(
                "dbo.VacationState",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vacation", "StateId", "dbo.VacationState");
            DropForeignKey("dbo.UserDetails", "TeamId", "dbo.Team");
            DropIndex("dbo.Vacation", new[] { "StateId" });
            DropIndex("dbo.UserDetails", new[] { "TeamId" });
            DropTable("dbo.VacationState");
            DropTable("dbo.Vacation");
            DropTable("dbo.UserDetails");
            DropTable("dbo.Team");
            DropTable("dbo.BankHoliday");
        }
    }
}
