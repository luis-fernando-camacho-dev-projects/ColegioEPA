ColegioEPA.AttendanceType = {
    TAKE_CLASE: "take_clase",
    CARRY_OVER: "carry_over"
}
ColegioEPA.Attendance = DS.Model.extend({
    teacher: DS.belongsTo('teacher', {async:false}),
    course : DS.belongsTo('course', {async:false}),
    typeAttendance: DS.attr('string'),
    markedDate: DS.attr('string'),
    classReplaceDate: DS.attr('string'),
    postponedDate: DS.attr('string')
});
