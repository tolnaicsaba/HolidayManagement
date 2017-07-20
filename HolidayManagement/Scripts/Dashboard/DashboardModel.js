function DashboardModel() {
    var _self = this;
    _self.users = ko.observableArray(null);
    _self.teams = ko.observableArray(null);
    _self.roles = ko.observableArray(null);
    _self.errorMessage = ko.observableArray();
    _self.banks=ko.observableArray(null);
    _self.Vacations = ko.observableArray(null);
    _self.calendar = ko.observable();
    this.manageUser = new UserModel();
    this.initialize = function (data) {
        var users = _.map(data.UserList, function (user, index) {
            return new UserModel(user);
        });
        var teams = _.map(data.TeamList, function (team, index) {
            return new TeamModel(team);
        });
        var roles = _.map(data.Roles, function (role,index) {
            return new RoleModel(role);
        });
        //var calendar = _.map(data.Calendar, function (calendar, index) {
        //    return new CalendarModel(calendar);
        //});
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
                alert("User succesfully created!")
            }
           
        });
    }


    this.addHoliday = function (data) {
        $.ajax({
            url: "/Dashboard/AddHoliday",
            type: "POST",
            data: {

            },
            dataType:"Json"
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
    //this.UpdateUser = function (user, manageUserRoleID) {
    //    $('#modal-header').text('Edit user');
    //    $("#createb").hide();
    //    $("#edit").show();
    //    _self.manageUser.id(user.id());
    //    _self.manageUser.lastname(user.LastName());
    //    _self.manageUser.firsname(user.FirstName());
    //    _self.manageUser.Email(user.Email());
    //    _self.manageUser.hiredate(user.HireDate());
    //    _self.manageUser.maxdays(user.MaxDays());
    //    if (user.TeamId() != null) {
    //        _self.manageUser.TeamId(user.TeamId());
    //    }
    //    else {
    //        _self.manageUser.TeamId(new TeamModel());
    //    }
    //}
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
  
            }
        });
    }


    var setDateWithZero = function (date) {

        if (date < 10)

        date = "0" + date;

        return date;

    };
    var dateTimeReviver = function (value) {

        var match;
        if (typeof value ==='string') {

match = /\/Date\((\d*)\)\//.exec(value);

        if (match) {

            var date = new Date(+match[1]);

            return date.getFullYear() + "-" + setDateWithZero(date.getMonth() + 1) + "-" +

            setDateWithZero(date.getDate()) +

            "T" + setDateWithZero(date.getHours()) + ":" +

            setDateWithZero(date.getMinutes()) + ":" + setDateWithZero(date.getSeconds()) + "." +

            date.getMilliseconds();

        }

    }

    return value;

};

}
function InitializeDashboardModel(data) {

    DashboardModel.instance = new DashboardModel();



    DashboardModel.instance.initialize(data);



    ko.applyBindings(DashboardModel.instance);

}