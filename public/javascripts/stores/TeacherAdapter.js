ColegioEPA.TeacherAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000/teacher'
});
ColegioEPA.TeacherSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.TeacherStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.TeacherAdapter'
});
