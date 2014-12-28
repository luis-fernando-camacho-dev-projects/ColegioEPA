ColegioEPA.DateField = Ember.TextField.extend({
    _picker: null,
    modelChangedValue: function(){
      var picker = this.get("_picker");
      if (picker){
        picker.setDate(this.get("value"));
      }
    }.observes("value"),
 
    didInsertElement: function(){
      currentYear = (new Date()).getFullYear();
      formElement = this.$()[0];
      picker = new Pikaday({
        field: formElement,
        yearRange: [1900,currentYear+2],
        format: 'DD-MM-YYYY'
      });
      this.set("_picker", picker);
    },
 
    willDestroyElement: function(){
      picker = this.get("_picker");
      if (picker) {
        picker.destroy();
      }
      this.set("_picker", null);
    }
});

Ember.Handlebars.helper('custom-date-picker', ColegioEPA.DateField);