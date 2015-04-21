$(document).ready(function() {
    $('ul li:has(ul)').hover(function(e) {
         $(this).find('ul').css({display: "block"});
     },
     function(e) {
         $(this).find('ul').css({display: "none"});
     });
    try
    {
        var role = utilsEPA.getRole(), displayRole;
        if (role == 'student') {
            displayRole = 'Stud.';
        } else if (role == 'teacher') {
            displayRole = 'Prof.';            
        } else {
            displayRole = 'Admin.';
        }
        $('#logout').on('click', function() {
            utilsEPA.LogOut();
        });
    }catch(e){
        console.log('err');
    }
    
    try
    {
        var nameUser = utilsEPA.getUser().configValues.split("-")[0];
        $('#session').text(nameUser + "("+displayRole+")");
    } catch( e) {

    }
    

    //fill form to edit user
    $('#editUser').click(function() {
        $( "#dialog-form" ).dialog( {
            open:function() {
                utilsEPA.fillUser();
                $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({submitSuccess: function($form, event) {
                    var formValues = $form.serializeArray();
                    var user = { user:
                                    {
                                        login : formValues[0].value,
                                        password : $('#password').val(),
                                        email : $('#email').val(),
                                        role : utilsEPA.getRole(),
                                        ci : $('#ci').val(),
                                        objectOwner : utilsEPA.getObjectOwner(),
                                        birthDate : $('#birthDate').val(),
token : $('#name').val()+"-"+$('#lastName').val()+";"+$('#ci').val()+";"+$('#phone').val()+"-"+$('#cellPhone').val()+";"+$('#address').val()+";"+$('#birthDate').val()
                                    }
                                };
                    utilsEPA.updateSession(user.user);
                    var dataInfo = JSON.parse(JSON.stringify(user.user));
                    dataInfo['phone'] = $('#phone').val();
                    dataInfo['cellPhone'] = $('#cellPhone').val();
                    dataInfo['address'] = $('#address').val();
                    dataInfo['lastName'] = $('#lastName').val();
                    dataInfo['birthDate'] = $('#birthDate').val()+"";
                    dataInfo['name'] = $('#name').val()+"";
                    delete dataInfo.login;
                    delete dataInfo.objectOwner;
                    delete dataInfo.role;
                    $.ajax({url:'http://localhost:3000/user/users/'+utilsEPA.getId(), type:"PUT", dataType: 'json',contentType: "application/x-www-form-urlencoded; charset=UTF-8",crossDomain: true, data:user,
                                success:function(result) {
                                    if (utilsEPA.getRole() != 'administrator') {
                                        $.ajax({url: utilsEPA.getUrlByUser() , type:"PUT", dataType:'json', contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                                            crossDomain:true, data : utilsEPA.builtUserInfo(dataInfo), headers : {'API_KEY': localStorage.getItem("token")},
                                            success: function(result) {
                                                window.href = "http://localhost:3000/student/attendance"
                                            }, error: function(result) {
                                            }
                                        });
                                    }
                                    }, error:function(res) {
                                        alert("Bad thing happend! " + res.statusText);
                                    }
                    });
                },
                    submitError: function($form,event, errors) {
                        console.log('error trying to send');
                    }
                });

                $('#birthDate').datepicker();
            }
        });
    });
    $('#cancel').click(function() {
        $('#dialog-form').dialog("close");
    });
});



function validateLogin($el, value, callback) {
    var callbackfunction = callback, regxUser=/^[a-zA-Z](([\._\-][a-zA-Z0-9])|[a-zA-Z0-9])*[a-z0-9]$/;

    if (utilsEPA.getLogin() === value) {
        callback({value:value, valid:true, message: 'formato incorrecto del nombre del Usuario'});
    }
    else if(regxUser.test(value)) {
        $.ajax({url:'http://localhost:3000/utils/userName/'+value, type:'GET', dataType: 'json',contentType: "application/json; charset=utf-8",
            success:function(result) {
                callbackfunction(result);
            },
            error:function(res) {
                callbackfunction({
                    value: value,
                    valid: false,
                    message: "error en el servidor contactar con el administrator"
                });
            }
        });
    } else {
        callback({value:value, valid:false, message: 'formato incorrecto del nombre del Usuario'});
    }
}

function validateCI($el, value, callback) {
    var callbackfunction = callback, ci = parseInt(value), regxCi = /[a-z]/i;
    if ( !regxCi.test(value) && !isNaN(ci) && ci >450000 && ci <12000000) {
        $.ajax({url:'http://localhost:3000/utils/ci/'+ci, type:'GET', dataType: 'json',contentType: "application/json; charset=utf-8",
            success:function(result) {
                result.value = value;
                callbackfunction(result);
            },
            error:function(res) {
                callbackfunction({
                    value: value,
                    valid: false,
                    message: "error en el servidor contactar con el administrator"
                });
            }
        });
    } else {
        callback({value:value, valid:false, message: 'ingreso un ci incorrecto'});
    }
}
