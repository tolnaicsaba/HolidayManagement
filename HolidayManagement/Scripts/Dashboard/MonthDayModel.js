function MonthDayModel(data) {
    this.Day = ko.observable();
    this.IsFreeDay = ko.observable();

    if(data!=null)
    {
        this.Day(data.Day);
        this.IsFreeDay(data.IsFreeDay);
    }
}