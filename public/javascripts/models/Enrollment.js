ColegioEPA.Enrollment = DS.Model.extend({
    student: DS.belongsTo('student', {async:false}),
    courses: DS.hasMany('course',  {async:false}),
    payDate: DS.attr('string'),
    costEnrollment: DS.attr('number'),
    nit: DS.attr('number'),
    discount: DS.attr('number', {defaultValue:0}),
    totalCostCourse: function() {
        
        var courses = this.get('courses'),
        totalCost =0;
        courses.content.forEach(function(content){
            totalCost += content.get('data').cost;
        },this);
        return totalCost;
        //return 0;
    }.property('totalCostCourse'),
    totalPay: function () {
        var totalCost = this.get('totalCostCourse') - this.get('discount') + this.get('costEnrollment');
        return totalCost;
    }.property('totalCost')
});
