
ColegioEPA.CoursesEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(course) {
            var myseft = this;
            course.set('teacher', this.teacherValue == null ? this.teachers.get('firstObject') : this.teacherValue);
            course.set('subject', this.subjectValue == null ? this.get('subjects').get('firstObject') :  this.subjectValue);
            course.set('days', utilsEPA.getDaysFromCourse());
            if (this.validationCourse(course)) {
            var spin = spin || $('#validation-data-dialog').dialog(
                {
                closeOnEscape:true,
                show:"show",
                    modal: true,
                    buttons: {
                        Cancelar: function() {
                        $(this).dialog( "close");
                        //window.location.href = utilsEPA.getHost() + "/course";
                        }
                    }
                });
                var courseJSON = course.toJSON();
                var getCourses = $.ajax({ url:utilsEPA.getHost() + '/validateData/validateCourse', type:"PUT", crossDomain:true, dataType: "json", contentType:"application/x-www-form-urlencoded; charset=UTF-8", data:courseJSON,
                    success:function(result) {
                        course.save();
                        myseft.get("target").transitionTo("courses");
                        spin.dialog("close");
                        $('#newCourse').remove();
                    },
                    error:function(res,message) {
                    $('#message').text(res.responseJSON.message);
                    $('#validationImgLoading').hide();
                    }
                });
            }

        }
    },
    validationCourse: function(course) {
        var validData = true;
        if(course.get('teacher') == null) {
            validData = false;
            alert('selecionar un profesor para el curso');
        } else if(course.get('subject')  == null) {
            validData = false;
            alert('selecionar un profesor para el curso');
        } else if(typeof course.get('name') == 'undefined' || course.get('name').trim().length == 0) {
            validData = false;
            alert('el nombre del curso no debe ser vacio');
        } else if(typeof course.get('startDate') == 'undefined' || course.get('startDate').trim().length == 0) {
            validData = false;
            alert('la fecha de inicio del curso no debe ser vacia');
        } else if(typeof course.get('endDate') == 'undefined' || course.get('endDate').trim().length == 0) {
            validData = false;1
            alert('la fecha de fin del curso no debe ser vacia');
        } else if(typeof course.get('startTime') == 'undefined' || course.get('startTime').trim().length == 0) {
            validData = false;
            alert('la hora inicio del curso no debe ser vacia');
        } else if(typeof course.get('endTime') == 'undefined' || course.get('endTime').trim().length == 0) {
            validData = false;
            alert('la hora fin del curso no debe ser vacia');
        } else if(typeof course.get('cost') == 'undefined') {
            validData = false;
            alert('el costo del curso debe ser mayor a 0 ');
        } else if(course.get('days').trim().length == 0) {
            validData = false;
            alert('se debe selecionar un 1 dia de la semana por lo menos');
        }

        return validData;

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
