function DashboardModel() {
    var _self = this;
    _self.users = ko.observableArray(null);
    _self.teams = ko.observableArray(null);
    _self.roles = ko.observableArray(null);
    _self.errorMessage = ko.observableArray();
    this.manageUser = new UserModel();
    this.initialize = function (data) {
        var users = _.map(data.UserList, function (user, index) {
            return new UserModel(user);
        });
        var teams = _.map(data.TeamList, function (team, index) {
            return new TeamModel(team);
        });
        var roles = _.map(data.Roles, function (role) {
            return new RoleModel(role);
        });
        _self.roles(roles);
        _self.users(users);
        _self.teams(teams);
    };

    this.createUser = function (data) {
        $.ajax({
            url: "/Account/CreateUser",
            type: "POST",
            data: {
                firstName: _self.manageUser.firstname(),
                lastName: _self.manageUser.lastname(),
                hireDate: _self.manageUser.hiredate(),
                maxDays: _self.manageUser.maxdays(),
                teamID: _self.manageUser.team.Id(),
                rolesid:_self.manageUser.roles.Id(),
               AspNetUser:{
                Email:_self.manageUser.email
        }
            },
            dataType:"Json",
            success: function (data) {
                alert("Successfully submitted.")
            }
           
        });
    }
    this.nullUser=function(data)
    {
        _self.manageUser.firstname(null);
        _self.manageUser.lastname(null);
        _self.manageUser.hiredate(null);
        _self.manageUser.maxdays(null);
        _self.manageUser.id(null);
    }
    this.frissUser=function(data)
    {
        _self.manageUser.firstname(data.firstname());
        _self.manageUser.lastname(data.lastname());
        _self.manageUser.hiredate(data.hiredate());
        _self.manageUser.maxdays(data.maxdays());
        _self.manageUser.id(data.id());
    }

    this.editUser= function(data)
    {
        $.ajax({
            url: "/Account/EditUser",
            type: "POST",
            data: {
                firstName: _self.manageUser.firstname(),
                lastName: _self.manageUser.lastname(),
                hireDate: _self.manageUser.hiredate(),
                maxDays: _self.manageUser.maxdays(),
                teamID: _self.manageUser.team.Id(),
                rolesid: _self.manageUser.roles.Id(),
                ID:_self.manageUser.id(),
                AspNetUser: {
                    Email: _self.manageUser.email
                }
            },
            dataType: "Json",
            success: function (data) {
                alert("")
            }
        });
    }

}
function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}