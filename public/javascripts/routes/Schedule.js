
ColegioEPA.Router.map(function () {
    this.route("index", { path: "/" });
    this.resource("schedule", {path: "/"}, 
        function() 
        {
        this.route("view", {path:"/view"});        
    });
});

ColegioEPA.ScheduleIndexRoute = Ember.Route.extend({
        setupController: function(controller) {
            var schedules = this.get('store').find('course');

            // TODO: crear content con los eventos

            controller.set('content', schedules);
        },
        renderTemplate: function() {
          this.render('schedule.index',{into:'application'});
        }
    });

ColegioEPA.ScheduleViewRoute = Ember.Route.extend({
        setupController: function(controller) {
            var schedules = this.get('store').find('course');

            controller.set('content', schedules);
        },
        renderTemplate: function() {
          this.render('schedule.view',{into:'application'});
        }
    });
