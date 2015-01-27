// Controllers

ColegioEPA.LoginIndexController = Ember.Controller.extend({

  reset: function() {
    this.setProperties({
      username: "",
      password: "",
      errorMessage: ""
    });
  },
  attemptedUrl: null,
  token: localStorage.token,
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  login: function() {
    var self = this, data = this.getProperties('username', 'password');
    // Clear out any error messages.
    this.set('errorMessage', null);
        $.post('/login', data).done(function(response) {
        self.set('token', response.token);
        var attemptedUrlValue = localStorage.getItem("attemptedUrl");
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('role', response.role);

        if (attemptedUrlValue !== null && attemptedUrlValue) {
              window.location.href = attemptedUrlValue;
        } else if (response.role === 'student') {
            localStorage.setItem('_objectId', response.student);
            window.location.href = "http://localhost:3000/student/attendance";
        } else if (response.role === 'administrator') {
            localStorage.setItem('_objectId', response.teacher);
            window.location.href = "http://localhost:3000/teacher";
        } else if (response.role === 'teacher') {
            localStorage.setItem('_objectId', response.teacher);
            window.location.href = "http://localhost:3000/teacher/attendance";
        }
    }).fail(function(response) {
            alert("error");
    });
    }
});
