function DashboardModel() {
    var _self = this;
    _self.users = ko.observableArray(null);
    _self.teams = ko.observableArray(null);
    _self.roles = ko.observableArray(null);
    _self.banks=ko.observableArray(null);
    _self.Vacations = ko.observableArray(null);
    _self.calendar = ko.observable();
    _self.month=ko.observable(null);
    _self.year = ko.observable(null);
    _self.MonthN = ko.observable(null);
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
        var calendar = _.map(data.Calendar.MonthDays, function (calendar, index) {
            return new CalendarModel(calendar);
        });
        _self.calendar(calendar);
        _self.roles(roles);
        _self.users(users);
        _self.teams(teams);
    };



    this.MonthName = new Array();
    this.MonthName[0] = 'January';
    this.MonthName[1] = 'February';
    this.MonthName[2] = 'March';
    this.MonthName[3] = 'April';
    this.MonthName[4] = 'May';
    this.MonthName[5] = 'June';
    this.MonthName[6] = 'July';
    this.MonthName[7] = 'August';
    this.MonthName[8] = 'September';
    this.MonthName[9] = 'October';
    this.MonthName[10] = 'November';
    this.MonthName[11] = 'December';


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
                if (data.successed == false) {
                    $("#error").html(data.Message);
                }
                else {
                    alert("User succesfully created!");
                }
            }
           
        });
    }

    this.previousmonth = function () {
        if (_self.month() == 0)
        {
            _self.month(11);
            _self.year(_self.year() - 1);
        }
        else
        {
            _self.month(_self.month);
        }

        $.ajax({
            url: "/Dashboard/GetMonth",
            type: "GET",
            data: {
                month: _self.month(),
                year: _self.year(),
            },
            succes: function (data) {
                _self.MonthName(data.calendar.MonthName);
                var days = _.map(data.calendar.MonthDays, function (day, index) {
                    return new MonthDayModel(day);
                });
                _self.days(days);
            }
        })
    }

    this.nextmonth = function () {
        if (_self.month() == 11)
        {
            _self.month(1);
            _self.year(_self.year() + 1);
        }
        else
        {
            _self.month(_self.month()+1);
        }

        $.ajax({
            url: "/Dashboard/GetMonth",
            type: "GET",
            data: {
                month: _self.month(),
                year: _self.year(),
            },
            succes: function (data) {
                _self.MonthName(data.calendar.MonthName);
                var days = _.map(data.calendar.MonthDays, function (day, index) {
                    return new Daymodel(day);
                });
                _self.days(days);
            }
        })
    }

    var datum = new Date();
    _self.month(datum.getMonth());
    _self.year(datum.getFullYear());
    _self.month(_self.MonthName[_self.month()]);

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
    this.UpdateUser = function (user, manageUser) {
        $('#modal-header').text('Edit user');
        $("#myModal").hide();
        $("#edit").show();
        _self.manageUser.id(user.id());
        _self.manageUser.lastname(user.lastname());
        _self.manageUser.firstname(user.firstname());
        _self.manageUser.email(user.email());
        _self.manageUser.hiredate(user.hiredate());
        _self.manageUser.maxdays(user.maxdays());
        if (user.team.Id() != null) {
            _self.manageUser.team.Id(user.team.Id());
        }
        else {
            _self.manageUser.team.Id(new TeamModel());
        }
    }
    this.editUser= function(data)
    {
        $.ajax({
            url: "/Account/EditUser",
            type: "POST",
            data: {
                firstname: _self.manageUser.firstname(),
                lastname: _self.manageUser.lastname(),
                hiredate: _self.manageUser.hiredate(),
                maxdays: _self.manageUser.maxdays(),
                teamID: _self.manageUser.team.Id(),
                rolesid: _self.manageUser.roles.Id(),
                id:_self.manageUser.id(),
                AspNetUser: {
                    Email: _self.manageUser.email
                }
            },
            dataType: "Json",
            success: function (data) {
                alert("User successfully edited!")
                $("#myModal").modal('hide');
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