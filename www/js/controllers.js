angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup,$ionicLoading,sk) {
'use strict';
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
         $scope.loginData = {};
          
         $scope.pics=["img/desarrollador.jpg"];
      $scope.loginData.username=localStorage.getItem('username');
      $scope.loginData.password=localStorage.getItem('password');

        // Form data for the login modal

sk.on('d',function(d){
 
});
      $scope.Departamentos = [
          'AMAZONAS', 
          'ANTIOQUIA', 
          'ARAUCA', 
          'ATLANTICO', 
          'BOLIVAR', 
          'BOYACA', 
          'CALDAS', 
          'CAQUETA', 
          'CASANARE', 
          'CAUCA', 
          'CESAR', 
          'CHOCO', 
          'CORDOBA', 
          'CUNDINAMARCA', 
          'GUAINIA', 
          'GUAJIRA', 
          'GUAVIARE', 
          'HUILA', 
          'MAGDALENA', 
          'META', 
          'N SANTANDER', 
          'NARINO', 
          'PUTUMAYO', 
          'QUINDIO', 
          'RISARALDA', 
          'SAN ANDRES', 
          'SANTANDER', 
          'SUCRE', 
          'TOLIMA', 
          'VALLE DEL CAUCA', 
          'VAUPES', 
          'VICHADA', 
      ]; 
          $scope.session= "Iniciar Session";


      $scope.Empleos=[
      {name:"daner",ap:"oscar"},
      {name:"oscar",ap:"maria"},
      {name:"maria",ap:"daner"},
      {name:"sebastian",ap:"maria"},
      {name:"marta",ap:"daner"}
      ];


        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope

        }).then(function(modal) {
          $scope.modal = modal;

        });
         $ionicModal.fromTemplateUrl('templates/filtros.html', {
          scope: $scope
        
        }).then(function(modal) {
          $scope.filtro = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
          $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
          $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
          console.log('Doing login', $scope.loginData);
      localStorage.setItem('username',$scope.loginData.username);
      localStorage.setItem('password',$scope.loginData.password);
      sessionStorage.setItem('daner',"oscar");
          // Simulate a login delay. Remove this and replace with your login
          // code if using a login system
          $timeout(function() {
            $scope.closeLogin();
          }, 500);
        };
       
        // Triggered in the login modal to close it
        $scope.closeFiltro = function() {
          $scope.filtro.hide();
        };

        // Open the login modal
        $scope.f = function() {
          $scope.filtro.show();
        };

        // Perform the login action when the user submits the login form
        $scope.dF = function() {
          $scope.filtro.Category="";
      $scope.filtro.Departament="";
      $scope.filtro.City="";
      $scope.filtro.Jornada="";
      $scope.filtro.TipoContrato="";
      $scope.filtro.html=false;
          // Simulate a login delay. Remove this and replace with your login
          // code if using a login system
          $timeout(function() {
            $scope.closeFiltro();
          }, 500);

        };
        $timeout(function() {
          if(localStorage.getItem('username')){
           
          }else{
             $scope.login();
          }
          
          }, 10);
        $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
 $scope.loading=true;
  $timeout(function() {
     $ionicLoading.hide();
     $scope.loading=false;
    }, 1000);

})



.controller('CV', function($scope, $stateParams,$ionicModal,$timeout,$ionicPopup,$ionicLoading) {
  'use strict';
   $scope.dataE=[
    {empresa:'unicesar',cargo:"profesor",departamento:"CESAR",actualmente:true,logros:"muchos",inicio:new Date()}];
  
    $scope.dataF=[
     {Institucion:'unicesar',Nivel:"ATLANTICO",Area:"CESAR",Estado:"proceso",logros:"muchos"}];
 
        $scope.Editar=false;  
        $scope.exp={};
        $scope.formacion={};
        $scope.idioma={};
        $scope.competecia={};

     $scope.editarE=function(l){
       if(l==2){
  
        var confirmPopup = $ionicPopup.confirm({
       title: "<div style='color:green'>Eliminar</div>",
       template: 'esta seguro que quiere elimar esta Experiencia Laboral?'
     });
    confirmPopup.then(function(res) {
       if(res) {
         console.log('eeacepto');
       } else {
         
       }
     });

   

     }

     else if(l==1){
  
     var confirmPopup = $ionicPopup.confirm({
       title: 'Editar',
       template: 'esta seguro que quiere editar esta Experiencia laboral?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('acepto');
       } else {
         
       }
     });

  

      }else{
      $scope.exp=l;
      $scope.Editar=true; 
      $scope.showcvE();
      }
      }
      $scope.editarF=function(l){
      if(l==2){
        
         var confirmPopup = $ionicPopup.confirm({
           title: 'Eliminar',
           template: 'esta seguro que quiere elimar esta informacion academica?'
         });
        confirmPopup.then(function(res) {
           if(res) {
             console.log('feacepto');
           } else {
             
           }
         });

   

          }

          else if(l==1){
            
               var confirmPopup = $ionicPopup.confirm({
                 title: 'Editar',
                 template: 'esta seguro que quiere editar esta informacion academica?'
               });
               confirmPopup.then(function(res) {
                 if(res) {
                   console.log('ddacepto');
                 } else {
                   
                 }
               });

            

          }
          else{
          $scope.formacion=l;
          $scope.Editar=true; 
          $scope.showcvF();
          }
          }

          $scope.showConfirm = function(t,b) {
               var confirmPopup = $ionicPopup.confirm({
                 title: t,
                 template: b
               });
             return  confirmPopup.then(function(res) {
                 if(res) {
                   return true;
                 } else {
                   return false;
                 }
               });

             };
            



            $ionicModal.fromTemplateUrl('templates/mcvE.html', {
              scope: $scope

            }).then(function(modal) {
              $scope.cvE = modal;

            });
            

            // Triggered in the login modal to close it
            $scope.closecvE = function() {
              $scope.Editar=false;
              $scope.cvE.hide();
            $scope.exp={};
            

            };

            // Open the login modal
            $scope.showcvE = function() {
              $scope.cvE.show();

            };

            // Perform the login action when the user submits the login form
            $scope.docvE = function() {


              // Simulate a login delay. Remove this and replace with your login
              // code if using a login system
              $timeout(function() {
                $scope.closecvE();
              }, 500);
            };
            $ionicModal.fromTemplateUrl('templates/mcvF.html', {
              scope: $scope

            }).then(function(modal) {
              $scope.cvF = modal;

            });
            

            // Triggered in the login modal to close it
            $scope.closecvF = function() {
              $scope.cvF.hide();
              $scope.formacion={};
              $scope.Editar=false;

            };

            // Open the login modal
            $scope.showcvF = function() {
              $scope.cvF.show();
            };

            // Perform the login action when the user submits the login form
            $scope.docvF = function() {


              // Simulate a login delay. Remove this and replace with your login
              // code if using a login system
              $timeout(function() {
                $scope.closecvF();
              }, 500);
            };
            $ionicModal.fromTemplateUrl('templates/mcvI.html', {
              scope: $scope

            }).then(function(modal) {
              $scope.cvI = modal;

            });
            

            // Triggered in the login modal to close it
            $scope.closecvI = function() {
              $scope.cvI.hide();
              $scope.idioma={};


            };

            // Open the login modal
            $scope.showcvI = function() {
              $scope.cvI.show();
            };

            // Perform the login action when the user submits the login form
            $scope.docvI = function() {


              // Simulate a login delay. Remove this and replace with your login
              // code if using a login system
              $timeout(function() {
                $scope.closecvI();
              }, 500);
            };
             $ionicModal.fromTemplateUrl('templates/mcvC.html', {
              scope: $scope

            }).then(function(modal) {
              $scope.cvC = modal;

            });
            

            // Triggered in the login modal to close it
            $scope.closecvC = function() {
              $scope.cvC.hide();
              $scope.competecia={};


            };

            // Open the login modal
            $scope.showcvC = function() {
              $scope.cvC.show();
            };

            // Perform the login action when the user submits the login form
            $scope.docvC = function() {


              // Simulate a login delay. Remove this and replace with your login
              // code if using a login system
              $timeout(function() {
                $scope.closecvC();
              }, 500);
            };
           $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
           $scope.loading=true;
            $timeout(function() {
               $ionicLoading.hide();
               $scope.loading=false;
              }, 1000);

})


.controller('aplicaciones',function($scope, $stateParams,$ionicModal,$timeout,$ionicPopup,$ionicLoading){
$scope.estado=['','','stado'];
$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
 $scope.loading=true;
  $timeout(function() {
     $ionicLoading.hide();
     $scope.loading=false;
    }, 1000);

})
