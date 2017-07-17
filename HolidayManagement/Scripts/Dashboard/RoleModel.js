function RoleModel(data) {
    this.Id = ko.observable(null);
    this.Name = ko.observable(null);
    if (data != null) { 
        this.Id(data.ID);
        this.Name(data.Name);
    }
}