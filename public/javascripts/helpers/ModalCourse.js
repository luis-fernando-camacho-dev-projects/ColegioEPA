/*
 * SettingsModalController
 */
ColegioEPA.SettingsModalController = Ember.ObjectController.extend({
  actions: {
    save: function(test) {
        if (this.previousCourse != null)
        {
            var indexCourse = ColegioEPA.CourseValues.indexOf(this.previousCourse, 0);
            ColegioEPA.CourseValues.replaceContent(indexCourse, 1, [this.courseSelected]);
        } else {
            ColegioEPA.CourseValues.pushObject(this.courseSelected)
        }
        this.get('target').send('removeModal');
      // save to server
    },
    removeModal: function() {
      console.log('remove from SettingModalController');
      this.get('target').send('removeModal');
    }
  },
courses: function() {
        return this.store.findAll('course');
    }.property(),
    courseSelected:null,
    previousCourse:null

});

/*
 * MyModalComponent
 */
ColegioEPA.MyModalComponent = Ember.Component.extend({
  actions: {
    ok: function() {
      this.$('.modal').modal('hide');
      this.sendAction('ok');
    }
  },
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement')
});
