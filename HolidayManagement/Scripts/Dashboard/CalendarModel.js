function CalendarModel(data) {

    this.day = ko.observable();
    this.description = null;
    this.name = null;
    this.isFreeDay = null;
    this.vacation = ko.observable([]);

    if (data!= null)
    {
        this.day(data.Day);
        this.description = data.Description;
        this.name = data.Name;
        this.isFreeDay = data.IsFreeDay;
        
        var vacation = _.map(data.Vacations, function (x) {
            return VacationModel(x);
        });
        this.vacation(vacation);
    }
}