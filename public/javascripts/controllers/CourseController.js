
ColegioEPA.CoursesEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(location) {
            location.set('teacher', this.teacherValue);
            location.set('subject', this.subjectValue),
            location.save();
            this.get("target").transitionTo("courses");
        }
    },
    isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
    }.property(),
    teachers: function() {
        return this.store.findAll('teacher');
    }.property(),
    subjects: function() {
        return this.store.findAll('subject');
    }.property(),
    init:function() {
        this._super();
        var teachers = this.store.all('teacher'), subjects = this.store.all('subject');
        this.teacherValue = teachers.get('length') > 0 ? teachers.get('firstObject'): null ;
        this.subjectValue = subjects.get('length') > 0 ? subjects.get('firstObject'): null ;
    },
    subjectValue:null,
    teacherValue: null
});


ColegioEPA.CoursesIndexController = Ember.ArrayController.extend({
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

