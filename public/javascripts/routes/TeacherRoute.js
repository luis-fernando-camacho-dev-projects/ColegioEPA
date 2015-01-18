ColegioEPA.Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("teachers", {path: "/"}, function() {
      this.route("new", {path:"/new"});
      this.route("edit", {path:"/:teacher_id"});
    });
});

    ColegioEPA.TeachersIndexRoute = ColegioEPA.AuthenticatedRoute.extend({
        setupController: function(controller) {
            var teachers = this.get('store').find('teacher'); // App.Location.find();
            controller.set('content', teachers);
        },
        renderTemplate: function() {
          this.render('teachers.index',{into:'application'});
        }
    });

    ColegioEPA.TeachersNewRoute = ColegioEPA.AuthenticatedRoute.extend({
      setupController: function(controller, model) {
        var newTeacher = this.store.createRecord('teacher', {});
        this.controllerFor('teachers.edit').setProperties({isNew: true, content:newTeacher});
      },
      renderTemplate: function() {
        this.render('teachers.edit', {into:'application'})
      }
    });

    ColegioEPA.TeachersEditRoute = ColegioEPA.AuthenticatedRoute.extend({
      setupController: function(controller, model) {
          this.controllerFor('teachers.edit').setProperties({isNew: false,content:model});
      },
      renderTemplate: function() {
          this.render('teachers.edit',{into:'application'});
      }
    });
