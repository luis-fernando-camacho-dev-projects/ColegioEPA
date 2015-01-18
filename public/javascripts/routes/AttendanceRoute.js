
ColegioEPA.Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("attendances", {path: "/"}, function() {
        this.route("new", {path:"/new"});
        this.route("edit", {path:"/:courses_id"});
    });
});
    ColegioEPA.AttendancesIndexRoute = ColegioEPA.AuthenticatedRoute.extend({
        setupController: function(controller) {
            var attendances = this.get('store').find('attendance');
            controller.set('content', attendances);
        },
        renderTemplate: function() {
            this.render('attendances.index',{into:'application'});
        }
    });

    ColegioEPA.AttendancesNewRoute = ColegioEPA.AuthenticatedRoute.extend({
      setupController: function(controller, model) {
        var newAttendance = this.store.createRecord('attendance', {});
        this.controllerFor('attendances.edit').setProperties({isNew: true, content: newAttendance});

      },
      renderTemplate: function() {
        this.render('attendances.edit', {into:'application'});
      },
      actions:{
        changeTemplate: function(selection, modelInstance) {

            this.render(selection,{outlet:'attendanceForm', into:'attendances.edit', model:modelInstance, controller:'attendances.edit'});
        }
      }
    });

    ColegioEPA.AttendancesEditRoute = ColegioEPA.AuthenticatedRoute.extend({
        setupController: function(controller, model) {
            this.controllerFor('attendances.edit').setProperties({isNew: false,content:model});
        },
        renderTemplate: function() {
            this.render('attendances.edit', {into:'application'});
        },
        actions:{
            changeTemplate: function(selection) {
                this.render(selection,{outlet:'attendanceForm', into:'attendances.edit'});
            }
        }
    });
