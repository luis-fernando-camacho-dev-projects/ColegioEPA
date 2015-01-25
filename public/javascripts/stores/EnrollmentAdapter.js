ColegioEPA.EnrollmentAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/api/enrollment',
  headers: {
      'API_KEY': localStorage.getItem("token")
  }
});
ColegioEPA.EnrollmentSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.EnrollmentStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.EnrollmentAdapter'
});
