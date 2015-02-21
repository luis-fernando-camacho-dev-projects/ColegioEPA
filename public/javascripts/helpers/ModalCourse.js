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
            this.controllerFor('enrollments.edit').replaceContent(indexCourse, 1, [this.courseSelected]);
        } else {
            this.controllerFor('enrollments.edit').courseBackup.pushObject(this.courseSelected == null ? this.get('courses').get('firstObject') : this.courseSelected);
            ColegioEPA.CourseValues.pushObject(this.courseSelected)
        }
        this.get('target').send('removeModal');
    },
    removeModal: function() {
      console.log('remove from SettingModalController');
      this.get('target').send('removeModal');
    }
  },
courses: function() {
        return this.store.findAll('course');
    }.property(),
    init:function() {
        var courseList = this.store.all('course');
        this.courseSelected = courseList.get('length') > 0 ? courseList.get('firstObject'): null ;
        this._super();
    },
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
