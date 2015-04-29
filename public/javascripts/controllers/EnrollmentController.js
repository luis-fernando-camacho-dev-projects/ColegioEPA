
ColegioEPA.EnrollmentsEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(enrollment) {
            if (this.isNew) {
                enrollment.set('student', this.studentValue == null ? this.students.get('firstObject') : this.studentValue);
            }
            enrollment.get('courses').clear();
            console.log('nro courses {0}',enrollment.get('courses').get('length'));
            ColegioEPA.CourseValues.forEach(function(item, index, enumerable) {
                enrollment.get('courses').pushObject(item);
            });
            if (this.validationEnrollment(enrollment)) {
                var myseft = this;
                var spin = spin || $('#validation-data-dialog').dialog(
                    {
                    closeOnEscape:true,
                    show:"show",
                        modal: true,
                        buttons: {
                            Cancelar: function() {
                            $(this).dialog("close");
                            myseft.get("target").transitionTo("enrollments");
                            $('#titleEnrollment').remove();
                            myseft.store.deleteRecord(enrollment);
                            }
                        }
                    });
                var enrollmentJSON = enrollment.toJSON();
                var getCourses = $.ajax({ async:false, url:utilsEPA.getHost() + '/validateData/validateEnrollment', type:"PUT", crossDomain:true, dataType: "json", contentType:"application/x-www-form-urlencoded; charset=UTF-8", data:enrollmentJSON,
                    success:function(result) {
                        enrollment.save();
                        ColegioEPA.CourseValues.clear();
                        myseft.get("target").transitionTo("enrollments");
                        spin.dialog("close");
                        $('#titleEnrollment').remove();
                    },
                    error:function(res,message) {
                        ColegioEPA.CourseValues.clear();
                        $.ajax({async:false, url: utilsEPA.getHost() + "/api/course/courses/" + res.responseJSON.courseId , type:"GET", dataType:'json', contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                                crossDomain:true, headers : {'API_KEY': localStorage.getItem("token")},
                                success: function(result) {
                                    $('#message').text("el curso "+ result.courses[0].name + " ya ha sido registrado en una inscripcion anterior");
                                    $('#validationImgLoading').hide();
                                }, error: function(result) {
                                    $('#message').text("error inesperado ha ocurrido");
                                    $('#validationImgLoading').hide();
                                }
                        });
                    }
                });
            }
        },
        deleteCourse:function(course) {
            ColegioEPA.CourseValues.removeObject(course);
            this.courseBackup.removeObject(course);
        },
        editCourse: function(course) {
        }
    },
    validationEnrollment : function(enrollment) {
        var validEnrollment = true;
        if (typeof enrollment.get('payDate') == 'undefined') {
            validEnrollment = false;
            alert('la fecha de pago no puede ser vacia');
        } else if (typeof enrollment.get('nit') == 'undefined') {
            validEnrollment = false;
            alert('el nit de pago no puede ser vacio');

        } else if (typeof enrollment.get('discount') == 'undefined') {
            validEnrollment = false;
            alert('el descuento de la inscripcion no debe ser vacio');
        } else if (enrollment.get('courses').content.length == 0) {
            validEnrollment = false;
            alert('la inscripcion tiene que tener cursos asignados');
        }
        return validEnrollment;
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
        var students = this.store.all('student');
        this.studentValue = students.get('length') > 0 ? students.get('firstObject'): null ;
        this._super();
    },
    loadCourse: function(courses) {
        ColegioEPA.CourseValues.clear();
        courses.forEach(function(item) {
            ColegioEPA.CourseValues.pushObject(item);
        })
    },
    courseBackup: Ember.ArrayController.create({content: []}),
    totalCourses: function() {

        var totalCostCourses = 0;
        ColegioEPA.CourseValues.forEach(function(course) {
            totalCostCourses += course.get('cost');
        })
        return totalCostCourses;
    }.property('courseBackup.@each.cost'),
    matricula: function() {
        return this.get('content').get('costEnrollment');
    }.property('content.costEnrollment'),
    total : function() {
        var totalEnrollment = this.get('totalCourses');
        if(!isNaN(parseInt(this.get('matricula')))) {
            totalEnrollment += parseInt(this.get('matricula'));
        }
        return totalEnrollment;
    }.property('courseBackup.@each.cost'),
    studentValue:null
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
        removeItem: function(enrollment) {
            enrollment.on("didDelete", this, function() {
                console.log("record deleted");
            });
            enrollment.destroyRecord();
            this.store.deleteRecord(enrollment);
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
