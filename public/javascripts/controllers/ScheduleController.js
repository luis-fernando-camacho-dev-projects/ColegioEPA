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
({
  existCalendar: true,
  needs: ['calendar']
});



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
            eventName = course.name;

            startdate = moment(course.startDate, "DD-MM-YYYY");
            enddate = moment(course.endDate, "DD-MM-YYYY");
            currentDate = startdate;
            startTimeString = course.startTime;
            endTimeString = course.endTime;

            eventType = 2;
            numberOfDays=enddate.diff(startdate, 'days');

            for(var i = 0; i<numberOfDays; i++)
            {
              currentDate.add(1, 'days').calendar();
              event =
              {
                name: eventName
                , start: moment(currentDate.format("DD-MM-YYYY")+' '+startTimeString, "DD-MM-YYYY HH:mm")
                , end: moment(currentDate.format("DD-MM-YYYY")+' '+endTimeString, "DD-MM-YYYY HH:mm")
                , type: eventType
              };
              events.push(event);
            }
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
