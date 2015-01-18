
ColegioEPA.Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("courses", {path: "/"}, function() {
        this.route("new", {path:"/new"});
        this.route("edit", {path:"/:courses_id"});
    });
});
    ColegioEPA.CoursesIndexRoute = ColegioEPA.AuthenticatedRoute.extend({
        setupController: function(controller) {
            var courses = this.get('store').find('course');
            controller.set('content', courses);
        },
        renderTemplate: function() {
          this.render('courses.index',{into:'application'});
        }
    });

    ColegioEPA.CoursesNewRoute = ColegioEPA.AuthenticatedRoute.extend({
      setupController: function(controller, model) {
        var newStudent = this.store.createRecord('course', {});
        this.controllerFor('courses.edit').setProperties({isNew: true, teachers: this.store.findAll('teacher'), content: newStudent});

      },
      renderTemplate: function() {
        this.render('courses.edit', {into:'application'});
      }
    });

    ColegioEPA.CoursesEditRoute = ColegioEPA.AuthenticatedRoute.extend({
      setupController: function(controller, model) {
          this.controllerFor('courses.edit').setProperties({isNew: false,content:model});
      },
      renderTemplate: function() {
          this.render('courses.edit', {into:'application'});
      }
    });
