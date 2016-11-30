// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'btford.socket-io'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

        .state('app.Empleos', {
            url: '/Empleos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/Empleos.html',

                }
            }
        })

        .state('app.aplicaciones', {
                url: '/aplicaciones',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/aplicaciones.html',
                        controller: 'aplicaciones'
                    }
                }
            })
            .state('app.cv', {
                url: '/cv',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/cv.html',
                        controller: 'CV'
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/Empleos');
    })
    .factory('socket', function(socketFactory) {
        var myIoSocket = io.connect('http://unitrabajoweb-92158.onmodulus.net');

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
    })
    .factory('service', function($http, $q, $ionicLoading, $timeout, $ionicPopup) {
        var servicios = {};
        var wait = $q.defer();
        servicios.User = {};
        servicios.removeUser =function(){
            localStorage.removeItem('user');
             servicios.User = {};
        }
        servicios.getUser = function() {
           var tempUser = servicios.User;
           

            //console.log("salir session");
            return tempUser;
        }
        servicios.setUser = function(user) {
            servicios.User = user;
            localStorage.setItem('user', JSON.stringify(user));
            servicios.User.telefono = parseInt(user.telefono);
            console.log();
          //  console.log(user);
            //  console.log("entrar session");
        }
        servicios.finduser = function(id) {
            return $http.get("http://unitrabajoweb-92158.onmodulus.net/API/egresadoshow/" + id)
            }

        servicios.showOfertas = function(){
            return $http.get("http://unitrabajoweb-92158.onmodulus.net/API/ofertashow")
        }    
            //////-*********egresado ---//////
        servicios.egresadonew = function(datos) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/egresadonew", JSON.stringify(datos))
        }
        servicios.egresadoupdate = function(_id, datos) {
            return $http.put("http://unitrabajoweb-92158.onmodulus.net/API/egresadoupdate/" + _id, JSON.stringify(datos))
        }
        servicios.egresadoauth = function(datos) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/egresadoauth", JSON.stringify(datos))
        }
        servicios.experiencianew = function(datos) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/experiencianew", JSON.stringify(datos))
        }
        servicios.experienciadelete = function(id, idcv) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/experienciadelete/" + id, { '_idcv': idcv })
        }
        servicios.experienciaupdate = function(datos) {
            return $http.put("http://unitrabajoweb-92158.onmodulus.net/API/experienciaupdate/" + datos._id, JSON.stringify(datos))
        }
        servicios.estudionew = function(datos) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/estudionew", JSON.stringify(datos))
        }
        servicios.estudiodelete = function(id, idcv) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/estudiodelete/" + id, { '_idcv': idcv })
        }
        servicios.estudioupdate = function(datos) {

            return $http.put("http://unitrabajoweb-92158.onmodulus.net/API/estudioupdate/" + datos._id, JSON.stringify(datos))
        }
        servicios.idiomanew = function(datos) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/idiomanew", JSON.stringify(datos))
        }
        servicios.idiomadelete = function(id, idcv) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/idiomadelete/" + id, { '_idcv': idcv })
        }
        servicios.competencianew = function(datos) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/competencianew", JSON.stringify(datos))
        }
        servicios.competenciadelete = function(id, idcv) {
            return $http.post("http://unitrabajoweb-92158.onmodulus.net/API/competenciadelete/" + id, { '_idcv': idcv })
        }
        return servicios;

    });
