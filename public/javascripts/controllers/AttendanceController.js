
ColegioEPA.AttendancesEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(attendance) {
            if (this.isValidAttendance(attendance)) {
                if (this.get('isNew')) {
                    attendance.set('teacher', this.get('teacher'));
                    attendance.set('course', this.courseValue == null? this.get('courses').get('firstObject'): this.courseValue);
                }
                attendance.save();
                this.get("target").transitionTo("attendances");
            }
        }
    },
    isValidAttendance: function(attendance) {
        var correctValue = true, regExpressionBackSlash = new RegExp('-', 'g'), c

        if (this.typeAttendanceClass == 'registrar clase') {
            if (typeof attendance.get('markedDate') === 'undefined') {
                alert('la clase tomada no puede tomar una fecha vacia');
                correctValue = false;
            }
            if (correctValue &&  utilsEPA.validateDateGratherThanToday(attendance.get('markedDate'))) {
                correctValue = false;
                alert('la fecha de la clase tomada debe ser mayor o igual que el dia de hoy');
            }
        } else {
            if (attendance.get('classReplaceDate') === 'undefined') {
                alert('la clase a reemplazar no puede tomar una fecha vacia');
                correctValue = false;
            } else if (attendance.get('postponedDate') === 'undefined') {
                alert('la clase a reemplazar no puede tomar una fecha vacia');
                correctValue = false;
            }
            if (correctValue && utilsEPA.validateDateGratherThanToday(attendance.get('classReplaceDate'))) {
                correctValue = false;
                alert('la fecha de la clase a postegar debe ser mayor o igual que el dia de hoy');
            }
            else if (correctValue && utilsEPA.validateDateGratherThanToday(attendance.get('postponedDate'))) {
                correctValue = false;
                alert('la fecha de la clase a reemplazar debe ser mayor o igual que el dia de hoy');
            }
        }
        return correctValue;
    },
    isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
    }.property(),
    courses: function() {
        var courses =this.store.find('course',{teacher: utilsEPA.getObjectOwner()})
        return courses;
    }.property(),
    teacher: function() {
        return this.store.all('teacher').findBy('id',utilsEPA.getObjectOwner());
    }.property(),
    typeAttendances: function() {
        return ['registrar clase','postergar clase'];
    }.property(),

    locationTypeChanged: function() {
        var templateName = this.typeAttendanceClass == 'registrar clase' ? 'test1' : 'test2';
        this.send('changeTemplate', templateName, this.get('content'));
    }.observes('typeAttendanceClass'),


    init:function() {
        var courses = this.store.find('course',{teacher: utilsEPA.getObjectOwner()});
        this.courseValue = courses.get('length') > 0 ? courses.get('firstObject'): null ;
        this._super();
    },
    courseValue:null,
    teacherValue: null,
    typeAttendanceClass: null
});

ColegioEPA.AttendancesIndexController = Ember.ArrayController.extend({
    filter:'',
    filteredContent: function(){
        var filter = this.get('filter'), rx = new RegExp(filter, 'gi'), attendances = this.get('arrangedContent');
            return attendances.filter(function(attendance) {
                if (attendance.get('markedDate') != null) {
                    return attendance.get('markedDate').match(rx) || attendance.get('course').get('name').match(rx) ;
                } else {
                    return attendance.get('classReplaceDate').match(rx) || attendance.get('postponedDate').match(rx) || attendance.get('course').get('name').match(rx) ;
                }
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
    }.property("content.@each"),

    actions: {
        removeItem: function(attendance) {
            attendance.on("didDelete", this, function() {
                console.log("record deleted");
            });
            this.store.deleteRecord(attendance);
            attendance.destroyRecord();

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


