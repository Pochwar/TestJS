$('#myform').submit(function(ev){
    //empecher rechargement de la page declenchée par le submit
    ev.preventDefault();
    $.ajax('form.php',{
        method : 'post',
        data : {
            username : $("#username").val(),
            password : $("#password").val(),
            age : $("#age").val(),
            message : $("#message").val(),
        },
        success : function(response){
            var msg = JSON.parse(response);
            $("h2").text("nom : " + msg.username);
            $("#affich_pass").text("mot de passe en clair : " + msg.password);
            $("#affich_age").text("age : " + msg.age);
            $("#affich_message").text("message : " + msg.message);
            console.log(response);
        },
        error : function(err){
            console.error(err)
        }
    });
});
