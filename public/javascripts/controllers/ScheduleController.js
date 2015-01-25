ColegioEPA.ScheduleController = Ember.ObjectController.extend({
  courses: function(){
    var courses = this.store.findAll('course');
    return courses;
  }.property()
});

ColegioEPA.ScheduleController = Ember.ArrayController.extend({
  itemController: 'Schedule'
});

window.ColegioEPA.ApplicationController = Ember.Controller.extend
{(
    needs: ['calendar']
});

///////////////////////////////////////////////////////////////////////////////
// Controller
///////////////////////////////////////////////////////////////////////////////
ColegioEPA.CalendarController = Ember.Calendar.CalendarController.extend
({
  needs: "Schedule",
  content: function (){
  var courses = this.store.findAll('course');
  var events = [];
  var date;
  var time;
  var duration;
  var eventName;
  var event;

  for (var course in courses) {

    date = 1;
    time = 1000 * 60 * 60 * 10;
    duration = 1000 * 60 * 60 * 2;
    eventName = course.cost;
    eventLocation = 'B1';
    eventType = 1;

    event =
    {
      name: eventName + events.length
      , start: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time)
      , end: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time + duration)
      , location: eventLocation
      , type: eventType

    };

    events.push(event);
  }

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
}.property(),

 eventViewClass: 'ColegioEPA.EventView'
});

Ember.Handlebars.registerBoundHelper('locsPresent',
function(myBinding, options) {
  console.log(myBinding);
  console.log(options);
  return true;
}
);
