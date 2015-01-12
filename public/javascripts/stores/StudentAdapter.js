/*
ColegioEPA.StudentAdapter = DS.FixtureAdapter.extend();
*/
ColegioEPA.StudentAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/api/student',
  headers: {
      'API_KEY': localStorage.getItem("token")
  }
});
ColegioEPA.StudentSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.StudentStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.StudentAdapter'
});
