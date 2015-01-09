
ColegioEPA.EnrollmentsEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(enrollment) {
            enrollment.set('student', this.studentValue);
            enrollment.get('courses').clear();
            console.log('nro courses {0}',enrollment.get('courses').get('length'));
            ColegioEPA.CourseValues.forEach(function(item, index, enumerable) {
                enrollment.get('courses').pushObject(item);
            });

            enrollment.save();
            this.get("target").transitionTo("enrollments");
        },
        deleteCourse:function(course) {
            ColegioEPA.CourseValues.removeObject(course);
        },
        editCourse: function(course) {
        }
    },
    isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
    }.property(),
    students: function() {
        return this.store.findAll('student');
    }.property(),
    courses: function() {
        return this.store.findAll('course');
    }.property(),
    init:function() {
        this._super();
        var students = this.store.all('student');
        this.studentValue = students.get('length') > 0 ? students.get('firstObject'): null ;
        var courseList = this.store.all('course');
        this.courseSelected = courseList.get('length') > 0 ? courseList.get('firstObject'): null ;
    },
    loadCourse: function(courses) {
        courses.forEach(function(item) {
            ColegioEPA.CourseValues.clear();
            ColegioEPA.CourseValues.pushObject(item);
        })
    },
    courseSelected: null
});


ColegioEPA.CourseValues = Ember.ArrayController.create({
    content: []
});

ColegioEPA.EnrollmentsIndexController = Ember.ArrayController.extend({
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
});

Ember.Handlebars.registerBoundHelper('locsPresent',
    function(myBinding, options) {
      console.log(myBinding);
      console.log(options);
      return true;
    }
);
