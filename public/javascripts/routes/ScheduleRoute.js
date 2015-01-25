ColegioEPA.Router.map(function () {
    this.resource("schedule", {path: "/schedule"});
});

ColegioEPA.IndexRoute = Ember.Route.extend({
    renderTemplate: function(){
        this._super();

        var controller = this.controllerFor('schedule');
        //this.render();
        /* This doesn't work with "unassociated" or "application" */
        this.render('event', {outlet: 'potatoOutlet', controller: controller});
    }
});
