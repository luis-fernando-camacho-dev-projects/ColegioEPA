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
        $.post('/login', data).done(function(response) {
            self.set('token', response.token);
            var attemptedUrlValue = localStorage.getItem("attemptedUrl");
                localStorage.setItem('user', JSON.stringify(response));
                localStorage.setItem('role', response.role);
            if (attemptedUrlValue !== null && attemptedUrlValue) {
                  window.location.href = attemptedUrlValue;
            }
            utilsEPA.redirectUser(response.role);
        }).fail(function(response) {
                alert('errror:'+response);
            });
    }
});
