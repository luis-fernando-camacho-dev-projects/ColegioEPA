ColegioEPA.Subject = DS.Model.extend({
    name: DS.attr('string'),
    contentSubject: DS.attr('string'),
    image: DS.attr('string'),
    schedule: DS.attr('string'),
    days: DS.attr('string'),
    matterLevelDetail : DS.attr('string')
});
