angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $ionicLoading, socket, service) {
        'use strict';
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.loginData = {};
        $scope.registro = {};
        $scope.Session = {};


        $scope.Session.name = "Iniciar Session";

        $scope.pics = ["img/desarrollador.jpg"];

        // Form data for the login modal

        socket.on('d', function(d) {

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



        $scope.Empleos = [
            { name: "daner", ap: "oscar" },
            { name: "oscar", ap: "maria" },
            { name: "maria", ap: "daner" },
            { name: "sebastian", ap: "maria" },
            { name: "marta", ap: "daner" }
        ];

        $ionicModal.fromTemplateUrl('templates/mresgistrar.html', {
            scope: $scope

        }).then(function(modal) {
            $scope.registrar = modal;

        });
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
        $scope.closeregistro = function() {
            $scope.registro = {};

            $scope.registrar.hide();


        };
        $scope.doeditar = function() {
            var id = $scope.Session.user._id;
            console.log($scope.registro);

            service.egresadoupdate(id, $scope.registro).then(function(res) {
                $scope.Session.user = res.data;
                $scope.Session.state = true;
                $scope.Session.name = $scope.Session.user.nombres;
                service.setUser($scope.Session.user);


                $scope.showAlert("Perfil",
                    "editado corretamente!");
            })


        }

        // Open the login modal
        $scope.login = function() {
            $scope.loginData = {};
            $scope.modal.show();
        };
        $scope.showregistro = function() {
            $scope.registrar.show();
            $scope.closeLogin();
        };
        $scope.doregistro = function() {
                service.egresadonew($scope.registro);
                $scope.closeregistro();

            }
            // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            //console.log($scope.loginData);
            service.egresadoauth($scope.loginData).then(function(res) {
                console.log(res);
                if (!res.data) {

                    $scope.showAlert("Session",
                        "email o password invalido");
                } else {
                    $scope.Session.user = res.data;
                    service.setUser($scope.Session.user);
                    $scope.Session.state = true;
                    $scope.showAlert("Session",
                        "ha inicioado session corretamente!");
                    $scope.Session.name = $scope.Session.user.nombres;
                    $scope.closeLogin();
                }

            })

        };
        $scope.salirSession = function() {
            localStorage.setItem('user', "");
            $scope.Session.user = null;
            $scope.Session.state = false;
            $scope.loginData = {};
            service.setUser($scope.Session.user);

        }


        // Triggered in the login modal to close it
        $scope.closeFiltro = function() {
            $scope.filtro.hide();
        };
        $scope.showeditarregistro = function() {
                $scope.registro = $scope.Session.user;
                $scope.showregistro();

            }
            // Open the login modal
        $scope.f = function() {
            $scope.filtro.show();
        };
        $scope.showAlert = function(t, b) {
            var alertPopup = $ionicPopup.alert({
                title: t,
                template: b
            });

        }

        // Perform the login action when the user submits the login form
        $scope.dF = function() {
            $scope.filtro.Category = "";
            $scope.filtro.Departament = "";
            $scope.filtro.City = "";
            $scope.filtro.Jornada = "";
            $scope.filtro.TipoContrato = "";
            $scope.filtro.html = false;
            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeFiltro();
            }, 500);

        };
        var initsession = localStorage.getItem('user');

        if (initsession) {
            //console.log(initsession);
            $scope.Session.user = JSON.parse(initsession);
            service.setUser($scope.Session.user);
            $scope.Session.state = true;
            $scope.Session.name = $scope.Session.user.nombres;
            //$scope.closeLogin();

        }
    })
    .controller('CV', function($scope, $stateParams, $ionicModal, $timeout, $ionicPopup, $ionicLoading, service) {
        'use strict';

        $scope.Editar = false;
        $scope.experiencia = {};
        $scope.estudio = {};
        $scope.idioma = {};
        $scope.competecia = {};

        $scope.user = service.getUser();
        $scope.dataE = [
            { empresa: 'unicesar', cargo: "profesor", departamento: "CESAR", actualmente: true, logros: "muchos", inicio: new Date() }
        ];

        $scope.dataF = [
            { Institucion: 'unicesar', Nivel: "ATLANTICO", Area: "CESAR", Estado: "proceso", logros: "muchos" }
        ];

        $scope.showAlert = function(t, b) {
            var alertPopup = $ionicPopup.alert({
                title: t,
                template: b
            });

        }

        $scope.editarE = function(l) {
            if (l == 2) {

                var confirmPopup = $ionicPopup.confirm({
                    title: "Eliminar",
                    template: 'esta seguro que quiere elimar esta Experiencia Laboral?'
                });
                confirmPopup.then(function(res) {
                    if (res) {

                        service.experienciadelete($scope.experiencia._id, $scope.user._id).then(function(res) {
                            service.finduser($scope.user._id).then(function(user) {


                                service.setUser(user.data);
                                $scope.user = service.getUser();

                                $scope.showAlert("Experiencia", "se Elimino corretamente!");
                                $scope.experiencia = {};
                            })


                        })
                    } else {

                    }
                });



            } else if (l == 1) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Editar',
                    template: 'esta seguro que quiere editar esta Experiencia laboral?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $scope.experiencia._idcv = $scope.user._id;
                        service.experienciaupdate($scope.experiencia).then(function(res) {
                            console.log(res.data);
                        });
                    } else {

                    }
                });



            } else {
                $scope.experiencia = l;
                $scope.Editar = true;
                $scope.showcvE();
            }
        }
        $scope.editarF = function(l) {
            if (l == 2) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Eliminar',
                    template: 'esta seguro que quiere elimar esta informacion academica?'
                });
                confirmPopup.then(function(res) {
                    if (res) {

                        service.estudiodelete($scope.estudio._id, $scope.user._id).then(function(res) {
                            service.finduser($scope.user._id).then(function(user) {


                                service.setUser(user.data);
                                $scope.user = service.getUser();

                                $scope.showAlert("Experiencia", "se Elimino corretamente!");
                                $scope.estudio = {};
                            })


                        })

                    } else {

                    }
                });



            } else if (l == 1) {

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Editar',
                    template: 'esta seguro que quiere editar esta informacion academica?'
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $scope.estudio._idcv = $scope.user._id;
                        service.estudioupdate($scope.estudio).then(function(res) {
                            console.log(res.data);
                        });
                    } else {

                    }
                });



            } else {
                $scope.estudio = l;
                $scope.Editar = true;
                $scope.showcvF();
            }
        }

        $scope.showConfirm = function(t, b) {
            var confirmPopup = $ionicPopup.confirm({
                title: t,
                template: b
            });
            return confirmPopup.then(function(res) {
                if (res) {
                    return true;
                } else {
                    return false;
                }
            });

        };




        $ionicModal.fromTemplateUrl('templates/mcvE.html', {
            scope: $scope

        }).then(function(modal) {
            $scope.cvE = modal

        });


        // Triggered in the login modal to close it
        $scope.closecvE = function() {
            $scope.Editar = false;
            $scope.cvE.hide();
            $scope.experiencia = {};


        };

        // Open the login modal
        $scope.showcvE = function() {
            $scope.cvE.show();

        };

        // Perform the login action when the user submits the login form
        $scope.docvE = function(exp) {

            if ($scope.user) {
                $scope.experiencia._idcv = $scope.user._id;

                service.experiencianew($scope.experiencia).then(function(res) {
                    service.finduser($scope.user._id).then(function(user) {

                        console.log(user.data);
                        service.setUser(user.data);
                        $scope.user = service.getUser();

                        $scope.showAlert("Experiencia", "se agrego corretamente!");
                        $scope.experiencia = {};
                    })

                })
            }



        };
        $ionicModal.fromTemplateUrl('templates/mcvF.html', {
            scope: $scope

        }).then(function(modal) {
            $scope.cvF = modal;

        });


        // Triggered in the login modal to close it
        $scope.closecvF = function() {
            $scope.cvF.hide();
            $scope.estudio = {};
            $scope.Editar = false;

        };

        // Open the login modal
        $scope.showcvF = function() {
            $scope.cvF.show();
        };

        // Perform the login action when the user submits the login form
        $scope.docvF = function() {
            if ($scope.user) {
                $scope.estudio._idcv = $scope.user._id;

                service.estudionew($scope.estudio).then(function(res) {
                    // console.log(res.data);
                    service.finduser($scope.user._id).then(function(user) {

                        //console.log(user.data);
                        service.setUser(user.data);
                        $scope.user = service.getUser();

                        $scope.showAlert("Formacion", "se agrego corretamente!");
                        $scope.estudio = {};
                    })

                })
            }
        };
        $ionicModal.fromTemplateUrl('templates/mcvI.html', {
            scope: $scope

        }).then(function(modal) {
            $scope.cvI = modal;

        });


        // Triggered in the login modal to close it
        $scope.closecvI = function() {
            $scope.cvI.hide();
            $scope.idioma = {};


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
            $scope.competecia = {};


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
        $scope.loading = true;
        $timeout(function() {
            $ionicLoading.hide();
            $scope.loading = false;
        }, 1000);

    })


.controller('aplicaciones', function($scope, $stateParams, $ionicModal, $timeout, $ionicPopup, $ionicLoading) {
    $scope.estado = ['', '', 'stado'];
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });
    $scope.loading = true;
    $timeout(function() {
        $ionicLoading.hide();
        $scope.loading = false;
    }, 1000);

})
