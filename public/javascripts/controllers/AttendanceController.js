
ColegioEPA.AttendancesEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(attendance) {
            if (this.get('isNew')) {
                attendance.set('teacher', this.teacherValue);
                attendance.set('course', this.courseValue);
            }
            attendance.save();
            this.get("target").transitionTo("attendances");
        }
    },
    isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
    }.property(),
    teachers: function() {
        return this.store.findAll('teacher');
    }.property(),
    courses: function() {
        return this.store.findAll('course');
    }.property(),
    typeAttendances: function(){
        return ['takeClass','carryOverClass'];
    }.property(),

    locationTypeChanged: function() {
        var templateName = this.typeAttendanceClass == 'takeClass' ? 'test1' : 'test2';
        this.send('changeTemplate', templateName, this.get('content'));
    }.observes('typeAttendanceClass'),


    init:function() {
        this._super();
        var teachers = this.store.all('teacher'), courses = this.store.all('course');
        this.teacherValue = teachers.get('length') > 0 ? teachers.get('firstObject'): null ;
        this.courseValue = courses.get('length') > 0 ? courses.get('firstObject'): null ;
    },
    courseValue:null,
    teacherValue: null,
    typeAttendanceClass: null
});

ColegioEPA.AttendancesIndexController = Ember.ArrayController.extend({
    editCounter: function () {
        return this.filterProperty('selected', true).get('length');
    }.property('@each.selected'),

    itemsSelected: function() {
    return this.get("editCounter")>0;
    }.property('editCounter'),
    exitStudent: function() {
        var itemsPresent = this.get('content').get('length') > 0;
        console.log(" +++ Computed locationsPresent prop with value " + itemsPresent);
        return itemsPresent;
    }.property("content.@each"),

    actions: {
        removeItem: function(student) {
            student.on("didDelete", this, function() {
                console.log("record deleted");
            });
            student.destroyRecord();
        },
        viewCourse: function(course) {
            console.log('test');
        },
        removeSelectedLocations: function() {
            arr = this.filterProperty('selected', true);
            if (arr.length==0) {
                output = "nothing selected";
            } else {
                output = "";
                for (i=0 ; i<arr.length ; i++) {
                  arr[i].destroyRecord()
                }
            }
        }
    }
  //}.property("content.isLoaded")
});

Ember.Handlebars.registerBoundHelper('locsPresent',
    function(myBinding, options) {
      console.log(myBinding);
      console.log(options);
      return true;
    }
);

