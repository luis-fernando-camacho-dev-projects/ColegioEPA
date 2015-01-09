///////////////////////////////////////////////////////////////////////////////
// Application
///////////////////////////////////////////////////////////////////////////////
App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend
({
    needs: ['calendar']
});

App.ApplicationView = Ember.View.extend
({
    templateName: 'application'
});

///////////////////////////////////////////////////////////////////////////////
// Views
///////////////////////////////////////////////////////////////////////////////
App.EventView = Ember.Calendar.EventView.extend
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


///////////////////////////////////////////////////////////////////////////////
// Controller
///////////////////////////////////////////////////////////////////////////////
App.CalendarController = Ember.Calendar.CalendarController.extend
({
    content: function () 
    {
      var events = [];
      var date;
      var time;
      var duration;
      var eventName;
      var event;
      
      date = 2;
      time = 1000 * 60 * 60 * 12;
      duration = 1000 * 60 * 60 * 2;
      eventName = 'Pending Piano Class';
      eventLocation = 'B1';
      eventType = 0;
      
      event =
      {
          name: eventName + events.length
          , start: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time)
          , end: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time + duration)
          , location: eventLocation
          , type: eventType


      };

      events.push(event);

      date = 3;
      time = 1000 * 60 * 60 * 10 ;
      duration = 1000 * 60 * 60 * 2;
      eventName = 'Going Guitar Class';
      eventType = 1;

      event =
      {
          name: eventName + events.length
          , start: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time)
          , end: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time + duration)
          , type: eventType
      };

      events.push(event);

      date = 5;
      time = 1000 * 60 * 60 * 11 ;
      duration = 1000 * 60 * 60 * 2;
      eventName = 'Done Sing Class';
      eventType = 2;

      event =
      {
          name: eventName + events.length
          , start: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time)
          , end: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time + duration)
          , type: eventType
      };
      
      events.push(event);

      date = 6;
      time = 1000 * 60 * 60 * 13 ;
      duration = 1000 * 60 * 60 * 2;
      eventName = 'suspended Sing Class';
      eventType = 3;

      event =
      {
          name: eventName + events.length
          , start: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time)
          , end: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time + duration)
          , type: eventType
      };
      
      events.push(event);

      return events;
    }.property()
    , eventViewClass: 'App.EventView'
});