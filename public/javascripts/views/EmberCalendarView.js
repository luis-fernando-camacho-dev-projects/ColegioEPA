///////////////////////////////////////////////////////////////////////////////
// Application
///////////////////////////////////////////////////////////////////////////////
//ColegioEPA = Ember.Application.create();

/*ColegioEPA.ApplicationController = Ember.Controller.extend
({
    needs: ['calendar']
});
*/
/*
ColegioEPA.ApplicationView = Ember.View.extend
({
    templateName: 'potato-view'
});*/

///////////////////////////////////////////////////////////////////////////////
// Views
///////////////////////////////////////////////////////////////////////////////
ColegioEPA.EventView = Ember.Calendar.EventView.extend
({
    templateName: function ()
    {
      return this.get('event.template') || 'ember-calendar-event';
    }.property('event.template')

  , classNameBindings: ['pending', 'going', 'done']
  , pending: function ()
    {
      return this.get('event.type') === 0;
    }.property('event.type')
  , going: function ()
    {
      return this.get('event.type') === 1;
    }.property('event.type')
  , done: function ()
    {
      return this.get('event.type') === 2;
    }.property('event.type')
  , suspended: function ()
    {
      return this.get('event.type') === 3;
    }.property('event.type')
});

//--------------------------------- test --------------//
ColegioEPA.PotatoView = Ember.View.extend({
    templateName: 'potato-view'
});
