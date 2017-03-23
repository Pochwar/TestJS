//PREMIER MODULE

// Gestionnaire de logs
var Logger = (function(){
    var self = {};
    var logger = new Array(); // attribut privé

    //méthode privée
    function displayLog(log){
        console.log(log.module + " : " + log.message);
    }


    //methodes publiques
    self.log = function(moduleName, msg){
        var log = {module: moduleName, message: msg};
        displayLog(log);
        logger.push(log);
    };

    self.showAll = function(){
        for(var i = 0; i < logger.length; i++)
            displayLog(logger[i]);
    };

    return self;
})();

// DEUXIEME MODULE
// Gestionnaire d'un div particulier (inscription, connexion,...)
var DivManager = (function(){
    var self = {};
    self.div = [];

    self.init = function(a){
        a.forEach(function(val,i){
            self.div[i] = document.getElementById(val);
            DivManager.Events.init(i+1);
        })
    };

    return self;
})();

DivManager.Events = (function(){
    var self = {};

    self.init = function(i){
        DivManager.div[i].onclick = onClick(i);
    }

    function onClick(a){
        //utilisation d'un autre module :)
        Logger.log("DivManager", "Le bloc " + a + " a été cliqué");
    }

    return self;
})();

DivManager.init([1,2,3]); //on appelle la fonction du module pour initialiser le click
