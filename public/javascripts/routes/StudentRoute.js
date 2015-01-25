ColegioEPA.Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("students", {path: "/"}, function() {
      this.route("new", {path:"/new"});
      this.route("edit", {path:"/:student_id"});
    });
});

ColegioEPA.StudentsIndexRoute = ColegioEPA.AuthenticatedRoute.extend({
    setupController: function(controller) {
        var students = this.get('store').find('student'); // App.Location.find();
        controller.set('content', students);
    },
    renderTemplate: function() {
      this.render('students.index',{into:'application'});
    }
});

ColegioEPA.StudentsNewRoute = ColegioEPA.AuthenticatedRoute.extend({
    setupController: function(controller, model) {
    var newStudent = this.store.createRecord('student', {});
    this.controllerFor('students.edit').setProperties({isNew: true, content:newStudent});
    },
    renderTemplate: function() {
    this.render('students.edit', {into:'application'})
    }
});
>>>>>>> db2b169ae470e02bfaf8f2c26eeed98727335125

ColegioEPA.StudentsEditRoute = ColegioEPA.AuthenticatedRoute.extend({
    setupController: function(controller, model) {
      this.controllerFor('students.edit').setProperties({isNew: false,content:model});
    },
    renderTemplate: function() {
      this.render('students.edit',{into:'application'});
    }
});
