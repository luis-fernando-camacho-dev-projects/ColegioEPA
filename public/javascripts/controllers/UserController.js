ColegioEPA.UsersEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(location) {
        location.save();
        this.get("target").transitionTo("users");
      }
    },
      isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
      }.property()
});

ColegioEPA.UsersIndexController = Ember.ArrayController.extend({

    filter:'',

    filteredContent: function(){
        var filter = this.get('filter'), rx = new RegExp(filter, 'gi'), Users = this.get('arrangedContent');
        return Users.filter(function(student) {
                return student.get('login').match(rx) || student.get('email').match(rx) ;
        });

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
            student.destroyRecord();
        },
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});

