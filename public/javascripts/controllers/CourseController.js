
ColegioEPA.CoursesEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(course) {
            course.set('teacher', this.teacherValue);
            course.set('subject', this.subjectValue),
            course.save();
            course.set('days', utilsEPA.getDaysFromCourse());
            debugger;
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
    filter:'',
    filteredContent: function(){
        var filter = this.get('filter'), rx = new RegExp(filter, 'gi'), courses = this.get('arrangedContent');
        return courses.filter(function(course) {
            return course.get('startDate').match(rx) || course.get('endDate').match(rx) ||course.get('name').match(rx) || course.get('teacher').get('name').match(rx) ;
        });
    }.property('arrangedContent', 'filter'),
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
    } .property("content.@each"),

    actions: {
        removeItem: function(course) {
            course.on("didDelete", this, function() {
                console.log("record deleted");
            });
            this.store.deleteRecord(course);
            course.destroyRecord();
        },
        viewCourse: function(course) {
            console.log('test');
        },
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});

Ember.Handlebars.registerBoundHelper('locsPresent',
    function(myBinding, options) {
      console.log(myBinding);
      console.log(options);
      return true;
    }
);
