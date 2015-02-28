ColegioEPA.StudentsEditController = Ember.ObjectController.extend({

    actions: {
        updateItem: function(location) {
        location.save();
        this.get("target").transitionTo("students");
      }
    },
      isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
      }.property()
});

ColegioEPA.StudentsIndexController = Ember.ArrayController.extend({
    filter:'',
    filteredContent: function(){
        var filter = this.get('filter'), rx = new RegExp(filter, 'gi'), students = this.get('arrangedContent');
        if (isNaN(parseInt(filter)))
        {
            return students.filter(function(student) {
                return student.get('name').match(rx) || student.get('email').match(rx) ;
            });
        } else {
            return students.filter(function(student) {
                return student.get('ci').toString().match(rx);
            });
        }
    }.property('arrangedContent', 'filter'),

    editCounter: function () {
        return this.filterProperty('selected', true).get('length');
    }.property('@each.selected'),

    itemsSelected: function() {
        return this.get("editCounter")>0;
    }.property('editCounter'),
    exitStudent: function() {
        var itemsPresent = this.get('content').get('length') > 0;
        return itemsPresent;
    }.property("content.@each"),

    actions: {
        removeItem: function(student) {
            student.on("didDelete", this, function() {
                console.log("record deleted");
            });
            this.store.deleteRecord(student);
            student.destroyRecord();
        },
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});
