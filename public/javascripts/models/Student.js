ColegioEPA.Student = DS.Model.extend({
  nombre: DS.attr('string'),
  email: DS.attr('string'),
  ci : DS.attr('number'),
  birthDate : DS.attr('string')
});


ColegioEPA.Student.reopenClass({
  createRecord: function(data, store) {
    var student = store.createRecord('student',{ id: data._id, nombre: data.student.nombre, email: data.student.email, ci:data.student.ci, birthDate: data.student.birthDate});
    return student;
    //return { id: data._id, nombre: data.student.nombre, email: data.student.email, ci:data.student.ci, birthDate: data.student.birthDate};
  }
});
/*
ColegioEPA.Student.FIXTURES = [
 {
   id:1,
   nombre: 'Luis Fernando Camacho',
   email: 'Learn Ember.js',
   ci: 4654,
   birthDate: '2015-45-45'
 },
 {
  id:2,
   nombre: 'Patricio',
   email: 'luis.camacho@gmail.com',
   ci: 456465,
   birthDate: '2015-45-45'
 },
 {
  id:3,
   nombre: 'BobSponja',
   email: 'OtroPatricio',
   ci: 4564564,
   birthDate: '2015-45-45'
 }
];
*/