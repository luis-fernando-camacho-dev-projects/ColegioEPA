ColegioEPA.Enrollment = DS.Model.extend({
    student: DS.belongsTo('student', {async:false}),
    courses: DS.hasMany('course',  {async:false}),
    payDate: DS.attr('string'),
    costEnrollment: DS.attr('number'),
    nit: DS.attr('number'),
    discount: DS.attr('number', {defaultValue:0}),
    totalCostCourse: function() {
        /*
        var courses = this.get('courses'),
        totalCost =0;
        courses.foreach(function(course){
            totalCost + = course.get('cost');
        });
        return totalCost;*/
        return 0;
    }.property('courses'),
    totalPay: function () {
        /*
        var totalCost = (this.get('totalCostCourse') + this.get('costEnrollment')),
            discount =(this.get('totalCostCourse') + this.get('costEnrollment')) * this.get('discount'),
            netCost = totalCost -discount;
            return netCost;*/
            return 0;
    }.property('totalCostCourse','costEnrollment','discount')
});
