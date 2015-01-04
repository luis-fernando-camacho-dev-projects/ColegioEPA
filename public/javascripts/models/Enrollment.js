ColegioEPA.Enrollment = DS.Model.extend({
    payDate:DS.attr('date'),
    costEnrollment: DS.attr('number'),
    nit:DS.attr('number'),
    student : DS.belongsTo('student'),
    courses : DS.hasMany('course'),
    totalCostCourse: function() {
        var courses = this.get('courses'),
        totalCost =0;
        courses.foreach(function(course){
            totalCost + = course.get('cost');
        });
        return totalCost;
    }.property('courses'),
    discount: DS.attr('number', {defaultValue:0},
    totalPay: function () {
        var totalCost = (this.get('totalCostCourse') + this.get('costEnrollment')),
            discount =(this.get('totalCostCourse') + this.get('costEnrollment')) * this.get('discount'),
            netCost = totalCost -discount;
            return netCost;
    }.property('totalCostCourse','costEnrollment','discount');
});
