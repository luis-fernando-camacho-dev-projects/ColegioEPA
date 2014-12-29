
ColegioEPA.Router.map(function () {

    this.route("index", { path: "/" });

    this.resource("subjects", {path: "/"}, function() {
      this.route("new", {path:"/new"});
      this.route("edit", {path:"/:subject_id"});
    });

    
});


    ColegioEPA.SubjectsIndexRoute = Ember.Route.extend({
        setupController: function(controller) {
            var subjects = this.get('store').find('subject'); // App.Location.find();
            controller.set('content', subjects);
        },
        renderTemplate: function() {
          this.render('subjects.index',{into:'application'});
        }
    });

    ColegioEPA.SubjectsNewRoute = Ember.Route.extend({
      setupController: function(controller, model) {
        var newStudent = this.store.createRecord('subject', {});
        this.controllerFor('subjects.edit').setProperties({isNew: true, content:newStudent});
      },
      renderTemplate: function() {
        this.render('subjects.edit', {into:'application'})
      }
    });

    ColegioEPA.SubjectsEditRoute = Ember.Route.extend({
      setupController: function(controller, model) {
          this.controllerFor('subjects.edit').setProperties({isNew: false,content:model});
      },
      renderTemplate: function() {
          this.render('subjects.edit',{into:'application'});
      }
    });
