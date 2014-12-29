ColegioEPA.SubjectAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/subject'
});
ColegioEPA.SubjectSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.SubjectStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.SubjectAdapter'
});
