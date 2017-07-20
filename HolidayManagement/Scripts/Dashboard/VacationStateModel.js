function VacationStateModel(data) {
    this.Id = ko.observable();
    this.Description = ko.observable();

    if(data!=null)
    {
        this.Id(data.Id);
        this.Description(data.Description);
    }
}