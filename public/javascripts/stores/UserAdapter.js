ColegioEPA.UserAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:3000/user'
});
ColegioEPA.UserSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

ColegioEPA.UserStore = DS.Store.extend({
  revision: 12,
  adapter: 'ColegioEPA.UserAdapter'
});
