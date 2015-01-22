ColegioEPA.TeacherAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:3000/api/teacher',
    headers: {
        'API_KEY': localStorage.getItem("token")
    }
});
ColegioEPA.TeacherSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.TeacherStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.TeacherAdapter'
});
