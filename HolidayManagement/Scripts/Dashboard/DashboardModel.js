function DashboardModel() {
    var _self = this;
    _self.users = ko.observableArray(null);
    _self.teams = ko.observableArray(null);
    this.manageUser = new UserModel();
    this.initialize = function (data) {
        var users = _.map(data.UserList, function (user, index) {
            return new UserModel(user);
        });
        var teams = _.map(data.TeamList, function (team, index) {
            return new TeamModel(team);
        });
        _self.users(users);
        _self.teams(teams);
    };
    this.createUser = function (data) {
        $.ajax({
            url: "/Account/CreateUser",
            type: "POST",
            data: {
                firstName: _self.manageUser.firstname,
                lastName: _self.manageUser.lastname,
                hireDate: _self.manageUser.hiredate,
                maxDays: _self.manageUser.maxdays,
               AspNetUsers:{
                Email:_self.manageUser.email
        }
            },
            dataType:"Json",
            success: function (data) {
                alert("Successfully submitted.")
            }
        });
    }
   
}
function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}