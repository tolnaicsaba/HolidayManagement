function VacationModel(data) {
    this.ID = ko.observable();
    this.StateID = ko.observable();
    this.UserID = ko.observable();
    this.StartDate = ko.observable();
    this.EndDate = ko.observable();
    this.Date = ko.observable();

    if(data!=null)
    {
        this.ID(data.ID);
        this.StateID(data.StateID);
        this.UserID(data.UserID);
        this.StartDate(data.StartDate);
        this.EndDate(data.EndDate);
        this.Date(data.Date);
    }
}