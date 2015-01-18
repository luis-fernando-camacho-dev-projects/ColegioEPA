ColegioEPA.User = DS.Model.extend({
  login: DS.attr('string'),
  password: DS.attr('string'),
  token : DS.attr('string'),
  email : DS.attr('string'),
  role:DS.attr('string')
});
