
ColegioEPA.Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("enrollments", {path: "/"}, function() {
        this.route("new", {path:"/new"});
        this.route("edit", {path:"/:enrollment_id"});
    });
});


ColegioEPA.EnrollmentsIndexRoute = ColegioEPA.AuthenticatedRoute.extend({
    setupController: function(controller) {
        var enrollment = this.get('store').find('enrollment');
        controller.set('content', enrollment);
    },
    renderTemplate: function() {
      this.render('enrollments.index',{into:'application'});
    }
});

ColegioEPA.EnrollmentsNewRoute = ColegioEPA.AuthenticatedRoute.extend({

    actions: {
        showModal: function(name, model) {
            var modalController = this.controllerFor('settings.modal');
            if (typeof model != 'undefined'){
                modalController.set('previousCourse', model);
                modalController.set('courseSelected', model);
            }
            this.render(name, {
                into: 'application',
                outlet: 'modal',
                model: model,
                controller: modalController
            });
        },
        removeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }

    },

    setupController: function(controller, model) {
        var newEnrollment = this.store.createRecord('enrollment', {});
        this.controllerFor('enrollments.edit').setProperties({isNew: true, content:newEnrollment});

  },
  renderTemplate: function() {
    this.render('enrollments.edit', {into: 'application'});
  }
});

ColegioEPA.EnrollmentsEditRoute = ColegioEPA.AuthenticatedRoute.extend({

    actions: {
         showModal: function(name, model) {
            var modalController = this.controllerFor('settings.modal');
                modalController.set('previousCourse', model);
                modalController.set('courseSelected', model);

            this.render(name, {
            into: 'application',
            outlet: 'modal',
            model: model,
            controller: modalController
            });
        },
         removeModal: function() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    },

  setupController: function(controller, model) {
    this.controllerFor('enrollments.edit').setProperties({isNew: false, content:model});
    this.controllerFor('enrollments.edit').loadCourse(model.get('courses'));
  },
  renderTemplate: function() {
      this.render('enrollments.edit', {into: 'application'});
  }
});
