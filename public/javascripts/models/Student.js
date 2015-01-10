ColegioEPA.Student = DS.Model.extend({
  nombre: DS.attr('string'),
  email: DS.attr('string'),
  ci : DS.attr('number'),
  birthDate : DS.attr('string'),
  courses : DS.hasMany('course', {async:false})
});
