function MonthDayModel(data) {
    this.Day = ko.observable();
    this.IsFreeDay = ko.observable();
    this.Description = ko.observable();


    if(data!=null)
    {
        this.Day(data.Day);
        this.IsFreeDay(data.IsFreeDay);
        this.Description(data.Description);
    }
}