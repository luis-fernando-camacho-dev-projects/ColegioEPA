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
            window.location.href = "http://localhost:3000/student/attendance";
        } else if (role === 'administrator') {
            window.location.href = "http://localhost:3000/teacher";
        } else if (role === 'teacher') {
            window.location.href = "http://localhost:3000/teacher/attendance";
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
            url="http://localhost:3000/api/student/students/"+this.getObjectOwner();
        } else {
            url="http://localhost:3000/api/teacher/teachers/"+this.getObjectOwner();
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
            url = 'http://localhost:3000/api/student/students/';
        } else {
            url = 'http://localhost:3000/api/teacher/teachers/';
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
    }

}
