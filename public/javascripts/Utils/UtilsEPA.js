var utilsEPA = {} || utilsEPA;
utilsEPA = {
    LogOut: function() {
        delete localStorage.token;
        delete localStorage.user;
        delete localStorage.role;
        delete localStorage._objectId;
        location.reload(true);
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
        var user = this.getUser(), url;

        if (this.getRole() === 'student') {
            url=this.getHost() + "/api/student/students/"+this.getObjectOwner();
        } else {
            url= this.getHost() + "/api/teacher/teachers/"+this.getObjectOwner();
        }
        $.ajax({url:url,type:'GET', dataType: 'json',contentType: "application/json; charset=utf-8",headers : {'API_KEY': localStorage.getItem("token")},
            success:function(result) {
                var valueREST;
                if (result.student !== null) {
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
            }, error:function(res) {
                alert("Bad thing happend! " + res.statusText);
            }
        });
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
        } else {
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
    }
}
