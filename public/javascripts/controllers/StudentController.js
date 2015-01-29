ColegioEPA.StudentsEditController = Ember.ObjectController.extend({

    actions: {
        updateItem: function(location) {
        location.save();
        this.get("target").transitionTo("students");
      }
    },
      isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
      }.property()
});

ColegioEPA.StudentsIndexController = Ember.ArrayController.extend({

  
    filter:'',

    filteredContent: function(){
        var filter = this.get('filter'), rx = new RegExp(filter, 'gi'), students = this.get('arrangedContent');
        if (isNaN(parseInt(filter)))
        {
            return students.filter(function(student) {
                return student.get('nombre').match(rx) || student.get('email').match(rx) ;
            });
        } else {
            return students.filter(function(student) {
                return student.get('ci').toString().match(rx);
            });
        }
    }.property('arrangedContent', 'filter'),

    editCounter: function () {
        return this.filterProperty('selected', true).get('length');
    }.property('@each.selected'),

    itemsSelected: function() {
        return this.get("editCounter")>0;
    }.property('editCounter'),
    exitStudent: function() {
        var itemsPresent = this.get('content').get('length') > 0;
        return itemsPresent;
    }.property("content.@each"),

    actions: {
        removeItem: function(student) {
            student.on("didDelete", this, function() {
                console.log("record deleted");
            });
            student.destroyRecord();
        },
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});


window.ColegioEPA.NewcalendarController = Ember.Controller.extend
({
  needs: 'calendar'
});

///////////////////////////////////////////////////////////////////////////////
// Controller
///////////////////////////////////////////////////////////////////////////////
ColegioEPA.CalendarController = Ember.Calendar.CalendarController.extend
({
  content: function ()
  {
    var courses = this.store.all('course');
    var events = [];
    var date;
    var time;
    var duration;
    var eventName;
    var event;

    courses.forEach(function(course)){

    }

    date = 0;
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

  date = 1;
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

  date = 2;
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

  date = 4;
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
