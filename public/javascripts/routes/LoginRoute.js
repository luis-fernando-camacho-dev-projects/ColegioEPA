
ColegioEPA.Router.map(function () {
    this.resource("login",{path:"/"}, function() {
    });
});


ColegioEPA.LoginIndexRoute = Ember.Route.extend({
    setupController: function(controller, context) {
        controller.reset();
    }
});

