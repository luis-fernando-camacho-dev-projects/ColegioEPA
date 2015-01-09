ColegioEPA.AttendanceAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/attendance'
});
ColegioEPA.AttendanceSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.AttendanceStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.AttendanceAdapter'
});
