
ColegioEPA.Router.map(function () {

    this.route("index", { path: "/" });

    this.resource("users", {path: "/"}, function() {
      this.route("new", {path:"/new"});
      this.route("edit", {path:"/:user_id"});
    });
});
ColegioEPA.UsersIndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        var user = this.get('store').find('user'); // App.Location.find();
        controller.set('content', user);
    },
    renderTemplate: function() {
      this.render('users.index',{into:'application'});
    }
});

ColegioEPA.UsersNewRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var newuser = this.store.createRecord('user', {});
    this.controllerFor('users.edit').setProperties({isNew: true, content:newuser});
  },
  renderTemplate: function() {
    this.render('users.edit', {into:'application'})
  }
});

ColegioEPA.UsersEditRoute = Ember.Route.extend({
  setupController: function(controller, model) {
      this.controllerFor('users.edit').setProperties({isNew: false,content:model});
  },
  renderTemplate: function() {
      this.render('users.edit',{into:'application'});
  }
});
