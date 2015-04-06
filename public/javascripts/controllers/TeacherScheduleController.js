ColegioEPA.TeacherScheduleController = Ember.ObjectController.extend({

  courses: function(){

    return courses;
  }.property()
});

ColegioEPA.TeacherScheduleController = Ember.ArrayController.extend({
  itemController: 'TeacherSchedule'
});


window.ColegioEPA.ApplicationController = Ember.Controller.extend
({
  //existCalendar: true
  //needs: 'calendar'
});

/*
///////////////////////////////////////////////////////////////////////////////
// Controller
///////////////////////////////////////////////////////////////////////////////
ColegioEPA.CalendarController = Ember.Calendar.CalendarController.extend
({
    content: function ()
    {
      //var courses = this.store.all('course');
      var events = [];
      var eventName;
      var startdate
      var enddate
      var event;

      eventName = 'Pending Piano';
      eventType = 0;
      startdate = "2015-02-01 09:30"
      enddate = "2015-02-01 11:00"
      event =
    {
      name: eventName
      , start: moment(startdate,"YYYY-MM-DD HH:mm")
      , end: moment(enddate,"YYYY-MM-DD HH:mm")
      , type: eventType

    };

    events.push(event);

    startdate = "2015-02-02 12:30"
    enddate = "2015-02-02 14:00"
    eventName = 'Going Guitar';
    eventType = 1;

    event =
    {
      name: eventName + events.length
      , start: moment(startdate,"YYYY-MM-DD HH:mm")
      , end: moment(enddate,"YYYY-MM-DD HH:mm")
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
*/