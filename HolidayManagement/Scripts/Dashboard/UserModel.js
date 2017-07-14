function UserModel(data)
{
    this.email = ko.observable();
    this.firstname = ko.observable();
    this.lastname = ko.observable();
    this.hiredate = ko.observable();
    this.maxdays = ko.observable();
    this.team = new TeamModel();
    if (data != null) {
        if (data.AspNetUser != null) {
            this.email(data.AspNetUser.Email);
        }
            this.firstname(data.FirstName);
            this.lastname(data.LastName);
            this.hiredate(data.HireDate);
            this.maxdays(data.MaxDays);
            this.team = new TeamModel(data.Team);
    }
}