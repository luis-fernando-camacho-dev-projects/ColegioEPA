ColegioEPA.Teacher = DS.Model.extend({
    name: DS.attr('string'),
    email: DS.attr('string'),
    ci : DS.attr('number'),
    birthDate : DS.attr('string')
});
