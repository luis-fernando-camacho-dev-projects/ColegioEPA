ColegioEPA.TeachersEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(teacher) {
            teacher.save();
            this.get("target").transitionTo("teachers");
        }
    },
      isNew: function() {
        console.log("calculating isNew");
        return this.get('content').get('id');
      }.property()
});

ColegioEPA.TeachersIndexController = Ember.ArrayController.extend({
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
        console.log(" +++ Computed locationsPresent prop with value " + itemsPresent);
        return itemsPresent;
      }.property("content.@each"),

    actions: {
        removeItem: function(teacher) {
            teacher.on("didDelete", this, function() {
                console.log("record deleted");
            });
            this.store.deleteRecord(teacher);
            teacher.destroyRecord();
        },

        removeSelectedLocations: function() {
            arr = this.filterProperty('selected', true);
            if (arr.length==0) {
                output = "nothing selected";
            } else {
                output = "";
                for (i=0 ; i<arr.length ; i++) {
                  arr[i].destroyRecord()
                }
            }
        }
    }
});

Ember.Handlebars.registerBoundHelper('locsPresent',
    function(myBinding, options) {
      console.log(myBinding);
      console.log(options);
      return true;
    }
);
