// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','btford.socket-io'])

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
.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect('http://localhost:3000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})
.factory('service',function($http,$q, $ionicLoading, $timeout,$ionicPopup){
var servicios={};
var wait = $q.defer();


   servicios.egresadonew= function(datos){

       
          return $http.post("http://localhost:3000/API/egresadonew", JSON.stringify(datos))
                     
            }

   servicios.egresadoupdate= function(_id,datos){       
      return  $http.put("http://localhost:3000/API/egresadoupdate/"+_id,JSON.stringify(datos))   
          
               }
   servicios.egresadoauth= function(datos){
     return $http.post("http://localhost:3000/API/egresadoauth", JSON.stringify(datos))
     }
   servicios.experiencianew= function(datos){
    return $http.post("http://localhost:3000/API/experiencianew",JSON.stringify(datos))


   }  

        return servicios;

});