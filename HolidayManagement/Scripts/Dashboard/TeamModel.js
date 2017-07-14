function TeamModel(data) {
    this.Name = [];
    this.Id = ko.observable(null);
    if (data != null) {
        this.Name = data.Description;
        this.Id(data.ID);
    }
}