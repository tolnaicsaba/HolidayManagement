function BankHolidayModel(data){
    this.Id = ko.observable();
    this.Description = ko.observable();
    this.Day = ko.observable();
    this.Month = ko.observable();

    if(data!=null)
    {
        this.Id(data.Id);
        this.Description(data.Description);
        this.Day(data.Day);
        this.Month(data.Month);
    }
}