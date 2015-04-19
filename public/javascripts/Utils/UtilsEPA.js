var utilsEPA = {} || utilsEPA;
utilsEPA = {
    LogOut: function() {
        delete localStorage.token;
        delete localStorage.user;
        delete localStorage.role;
        delete localStorage._objectId;
        window.location.href = this.getHost()+ "/login";
    },
    redirectUser: function(role) {
        if (role === 'student') {
            window.location.href = this.getHost() + "/student/attendance";
        } else if (role === 'administrator') {
            window.location.href = this.getHost() + "/teacher";
        } else if (role === 'teacher') {
            window.location.href = this.getHost() + "/teacher/attendance";
        } else {
            location.reload(true);
        }
    },
    getUser: function() {
        return JSON.parse(localStorage.getItem('user'));  
    },
    getRole: function() {
        return this.getUser().role;
    },
    getObjectOwner: function() {
        return this.getUser().objectOwner;
    },
    getId:function () {
        return this.getUser()._id;
    },
    getLogin: function() {
        return this.getUser().login;
    },

    fillUser: function() {
        var user = this.getUser(), url, valuesUser;

        if (this.getRole() == 'administrator') {
            valuesUser = user.configValues.split(";");
            names = valuesUser[0].split("-");
            phones = valuesUser[2].split("-");
            $('#login').val(user.login);
            $('#password').val(user.password);
            $('#name').val(names[0]);
            $('#ci').val(valuesUser[1]);
            $('#email').val(user.email);
            $('#birthDate').val(valuesUser[4]);
            $('#cellPhone').val(phones[0]);
            $('#phone').val(phones[1]);
            $('#address').val(valuesUser[3]);
            $('#lastName').val(names[1]);

        } else {
            if (this.getRole() === 'student') {
                url=this.getHost() + "/api/student/students/"+this.getObjectOwner();
            } else {
                url= this.getHost() + "/api/teacher/teachers/"+this.getObjectOwner();
            }
            $.ajax({url:url,type:'GET', dataType: 'json',contentType: "application/json; charset=utf-8",headers : {'API_KEY': localStorage.getItem("token")},
                success:function(result) {
                    var valueREST;
                    if (typeof(result.student) !== "undefined") {
                        valueREST = result.student;
                    } else {
                        valueREST = result.teacher;
                    }
                    $('#login').val(user.login);
                    $('#password').val(user.password);
                    $('#name').val(valueREST.name);
                    $('#ci').val(valueREST.ci);
                    $('#email').val(user.email);
                    $('#birthDate').val(valueREST.birthDate);
                    $('#cellPhone').val(valueREST.cellPhone);
                    $('#phone').val(valueREST.phone);
                    $('#address').val(valueREST.address);
                    $('#lastName').val(valueREST.lastName);
                }, error:function(res) {
                    alert("Bad thing happend! " + res.statusText);
                }
            });
        }


    },
    updateSession: function(newUser) {
        var currentUser = this.getUser();
        currentUser.login = newUser.login;
        currentUser.password = newUser.password;
        currentUser.email = newUser.email;
        localStorage.setItem('user', JSON.stringify(currentUser));
    },
    getUrlByUser: function() {
        var url;
        if (this.getRole() === 'student') {
            url = this.getHost() + '/api/student/students/';
        } else {
            url = this.getHost() + '/api/teacher/teachers/';
        }
        return url+this.getObjectOwner();
    },
    builtUserInfo: function(infoUser) {
        var session;
        if (this.getRole() === 'student') {
            session = { student : infoUser};
        } else if (this.getRole() == 'teacher') {
            session = { teacher : infoUser};
        }
        return session;
    },
    queryStringHash: function (key) {
        var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
        var value, m;
        while ((m=re.exec(window.location.hash)) != null) {
            value=m[1];
        }
        return value;
    },
    getHost: function() {
        return window.location.protocol +"//"+ window.location.host;
    },
    getCourseNameById: function(idCourse, courseCollection) {
        var result = $.grep(courseCollection, function(course) {
            return course._id == idCourse;
        });
        return result[0];
    },
    getEvents: function(attendanceCollection, courseCollection) {
        var events = [];
            attendanceCollection.forEach(function(attendance) {
                var event = {
                    title: utilsEPA.getCourseNameById(attendance.course, courseCollection).name,
                    start: new moment(attendance.markedDate,"DD-MM-YYYY").format('YYYY-MM-DD'),
                    constraint:'test'
                    };
                    events.push(event);
            });
        return events;
    },
    cleanUpTextFields: function(formId) {
        $(":input", "#"+formId).not(':button, :submit, :reset, :hidden, :radio, :checkbox').val('');
    },
    getDaysFromCourse: function() {
        var daysWeekColegioEPA=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
        var days="";
        daysWeekColegioEPA.forEach(function(day) {
            if ($('#'+day).is(":checked"))
            {
                days += day + ";";
            }
        });
        return days.length > 0 ? days.substring(0,days.length-1) : days;
    },
    checkCoursesFromString: function(days) {
        var daysWeekColegioEPA = days.split(";");
        days.forEach(function(day) {
            $('#'+day).prop('checked',true);
        })
    },
    getDate: function(date, time) {
        var arrDateCourse = date.split('-');
        var arrTimeCourse = time.split(':');
    return new Date(parseInt(arrDateCourse[2]), parseInt(arrDateCourse[1]) -1 , parseInt(arrDateCourse[0]), parseInt(arrTimeCourse[0]), parseInt(arrTimeCourse[1]),0,0);
    },
    validateDateGratherThanToday: function(dateToValidate) {
        var regExpressionBackSlash = new RegExp('-', 'g');
        var currentDate = new Date();
            currentDate.setHours(0);
            currentDate.setMinutes(0);
        var validateDate = Date.parse(dateToValidate.replace(regExpressionBackSlash,'/'));
        if (isNaN(validateDate)) {
                validateDate = this.getDate(dateToValidate, "00:00");
        }
        validateDate = this.getDate(dateToValidate, "00:00");
        return(validateDate < currentDate);
    }
}
