ColegioEPA.Teacher = DS.Model.extend({
    name: DS.attr('string'),
    lastName:DS.attr('string'),
    email: DS.attr('string'),
    ci : DS.attr('number'),
    birthDate : DS.attr('string'),
    phone : DS.attr('string'),
    cellPhone : DS.attr('string'),
    address : DS.attr('string'),
    courses: DS.hasMany('course', {async:false, inverse:'teacher'}),
    fullName: function() {
        return this.get('name')+ ' '+ this.get('lastName');
    }.property('name','lastName'),
    phones: function() {
        return this.get('phone')+ '-'+this.get('cellPhone');
    }.property('phone', 'cellPhone')
});
