ColegioEPA.UsersEditController = Ember.ObjectController.extend({
    actions: {
        updateItem: function(user) {
            user.set('login',this.get('ci'));
            user.set('password', this.get('ci'));
            user.set('email','');
            user.set('role', ColegioEPA.selectedRole.role.type);
            user.set('token', this.get('name')+'-'+this.get('lastName') + ';'+ this.get('phone')+'-'+this.get('cellPhone')+';'+this.get('address'));
            if (this.validationUser(user))
            {
                if (ColegioEPA.selectedRole.role.type == 'student') {
                    window.location.href = window.location.host + "/student"
                } else {
                    window.location.href = window.location.host + "/teacher"
                }
                this.get("target").transitionTo("users");
            }
        }
    },
    validationUser: function(user) {
        var validateData = true;
        if ($('input[name=nameUser]').val().length == 0) {
            validateData = false;
            alert('insertar el nombre del usuario');
        } else if ($('input[name=lastNameUser]').val().length == 0) {
            validateData = false;
            alert('insertar el apellido del usuario');
        } else if ($('input[name=ciUser]').val().length == 0) {
            validateData = false;
            alert('insertar el ci del usuario');
        } else if ($('input[name=phoneUser]').val().length == 0) {
            validateData = false;
            alert('insertar el telefono del usuario');
        } else if ($('input[name=cellPhoneUser]').val().length == 0) {
            validateData = false;
            alert('insertar el telefono del usuario');
        } else if ($('input[name=addressUser]').val().length == 0) {
            validateData = false;
            alert('insertar la direccion del usuario');
        }
        return validateData;
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
        removeItem: function(user) {
            user.on("didDelete", this, function() {
                console.log("record deleted");
            });
            this.store.deleteRecord(attendance);
            user.destroyRecord();
        },
        sortBy: function(property) {
            this.set('sortProperties', [property]);
            this.set('sortAscending', !this.get('sortAscending'));
        }
    }
});

ColegioEPA.Role = Ember.Object.extend({
    type: null,
    label: null
});

ColegioEPA.selectedRole = Ember.Object.create({
    role: null,

});

ColegioEPA.RolesController = Ember.ArrayController.create({
    content: [
        ColegioEPA.Role.create({type:'student', label:'estudiante'}),
        ColegioEPA.Role.create({type:'teacher', label:'profesor'}),
        ColegioEPA.Role.create({type:'administrator', label:'Administrador'}),
    ]
});

function queryStringHash(key) {
    var re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)','gi');
    var value, m;
    while ((m = re.exec(window.location.hash)) != null) {
        value = m[1];
    }
    return value;
}

ColegioEPA.selectedRole.set('role', ColegioEPA.RolesController.objectAt(2));
if (window.location.hash.search('=') > 0) {
    if (queryStringHash('selectedRole') == "student") {
        $(document).ready(function() { $('#usuario').text('Nuevo Estudiante'); });
        ColegioEPA.selectedRole.set('role', ColegioEPA.RolesController.objectAt(0));
    } else {
        $(document).ready(function() { $('#usuario').text('Nuevo Profesor'); });
        ColegioEPA.selectedRole.set('role', ColegioEPA.RolesController.objectAt(1));
    }
}


