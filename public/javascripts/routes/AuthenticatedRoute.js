ColegioEPA.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    var loginIndexController = this.controllerFor('login.index');
    loginIndexController.set('attemptedUrl', null);
    if (!loginIndexController.get('token')) {
      this.redirectToLogin();
    }
  },

  redirectToLogin: function(transition) {
    localStorage.setItem("attemptedUrl", document.URL);
    window.location.href = "http://localhost:3000/login";
  },

  events: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        alert('Something went wrong');
      }
    }
  }
});
