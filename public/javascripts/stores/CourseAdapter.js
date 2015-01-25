ColegioEPA.CourseAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/api/course',
  headers: {
      'API_KEY': localStorage.getItem("token")
  }
});
ColegioEPA.CourseSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.CourseStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.CourseAdapter'
});
