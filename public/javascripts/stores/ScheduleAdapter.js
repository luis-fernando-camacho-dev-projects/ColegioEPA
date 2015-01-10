ColegioEPA.ScheduleAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/schedule'
});
ColegioEPA.ScheduleSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.ScheduleStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.ScheduleAdapter'
});
