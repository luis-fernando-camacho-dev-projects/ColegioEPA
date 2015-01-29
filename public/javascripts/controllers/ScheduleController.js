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
ColegioEPA.couresValues =[];


///////////////////////////////////////////////////////////////////////////////
// Controller
///////////////////////////////////////////////////////////////////////////////
ColegioEPA.CalendarController = Ember.Calendar.CalendarController.extend
({
  needs: "Schedule",
  content: [],
   update : function() {
    var self = this;
    var events = [];
  var getCourses = $.ajax({
    url:'http://localhost:3000/api/course/courses',
    type:'GET',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    headers : {'API_KEY': localStorage.getItem("token")},
    success:function(result){
        result.courses.forEach(function(course) {
            date = events.length;
            time = 1000 * 60 * 60 * 10;
            duration = 1000 * 60 * 60 * 2;
            eventName = course.name;
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
            event=
                {
                  name: eventName + events.length
                  , start: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time)
                  , end: moment().startOf('day').add('days', date - moment().day()).add('milliseconds', time + duration)
                  , location: eventLocation
                  , type: eventType

                };

            events.push(event);

        });
         self.clear().pushObjects(events).notifyPropertyChange('content');
    },
    error:function(res){

        alert("Bad thing happend! " + res.statusText);
      }
    });

return events;
}.observes('week'),

 eventViewClass: 'ColegioEPA.EventView'
});

Ember.Handlebars.registerBoundHelper('locsPresent',
function(myBinding, options) {
  console.log(myBinding);
  console.log(options);
  return true;
}
);
