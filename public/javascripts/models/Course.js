ColegioEPA.Course = DS.Model.extend({
    name: DS.attr('string'),
    subject: DS.belongsTo('subject', {async:false}),
    teacher: DS.belongsTo('teacher', {async:false}),
    students: DS.hasMany('student', {async:false}),
    startDate: DS.attr('string'),
    endDate: DS.attr('string'),
    startTime: DS.attr('string'),
    endTime: DS.attr('string'),
    cost: DS.attr('number')
});
