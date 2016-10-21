angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $ionicLoading, service, socket) {
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
        socket.on('daner', function(d) {
            $scope.Empleos.push(d);

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
        $scope.showAlert = function(t, b) {
            var alertPopup = $ionicPopup.alert({
                title: t,
                template: b
            });

        }

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
            if (!$scope.Session.state) {
                $scope.login();
            }


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
            }, function(err) {
                $ionicLoading.hide();
                $scope.showAlert('error', err.data.message);
                console.log(err.data);
            });
        }

        // Open the login modal
        $scope.login = function() {
            $scope.loginData = {};
            $scope.modal.show();
        };
        $scope.showregistro = function() {
            $scope.registrar.show();
            //$scope.closeLogin();
        };
        $scope.doregistro = function() {
                $ionicLoading.show();
                service.egresadonew($scope.registro).then(function(succes) {
                    $ionicLoading.hide();

                    $scope.showAlert('error', err.data.mesagge);

                }, function(err) {
                    $ionicLoading.hide();
                    $scope.showAlert('error', err.data.message);
                    console.log(err.data);
                });




            }
            // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            $ionicLoading.show();
            //console.log($scope.loginData);
            service.egresadoauth($scope.loginData).then(function(res) {
                console.log(res);
                if (!res.data) {
                    $ionicLoading.hide();
                    $scope.showAlert("Session",
                        "email o password invalido");
                    //   service.setUser(JSON.parse(res.data));
                } else {
                    $ionicLoading.hide();
                    $scope.Session.user = res.data;
                    service.setUser($scope.Session.user);
                    $scope.Session.state = true;
                   
                    $scope.Session.name = $scope.Session.user.nombres;
                    $scope.closeLogin();
                }

            }, function(err) {
                $ionicLoading.hide();
                $scope.showAlert('error', err.data.message);
                console.log(err.data);
            });

        };
        $scope.salirSession = function() {
            $ionicLoading.show();
            service.removeUser();
            $scope.Session.user = service.getUser();
            $scope.Session.state = false;
            $scope.loginData = {};
            $ionicLoading.hide();

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
        var initsession = JSON.parse(localStorage.getItem('user'));
        //console.log(initsession);
        if (initsession) {
      
            //console.log(initsession);service.setUser($scope.Session.user);
     $scope.loginData.email=initsession.email;
     console.log(initsession.email);
     $scope.loginData.password = initsession.password;
     $scope.doLogin();
            // $scope.closeLogin();

        } else {
            
            //  $scope.login();
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
                    template: 'esta seguro que quiere eliminar esta Experiencia Laboral?'
                });
                confirmPopup.then(function(res) {

                    if (res) {
                        $ionicLoading.show();
                        service.experienciadelete($scope.experiencia._id, $scope.user._id).then(function(res) {
                            service.finduser($scope.user._id).then(function(user) {


                                service.setUser(user.data);
                                $scope.user = service.getUser();
                                $ionicLoading.hide();
                                $scope.showAlert("Experiencia", "se Elimino corretamente!");
                                $scope.experiencia = {};
                            }, function(err) {
                                $ionicLoading.hide();
                                $scope.showAlert("Experiencia", "Error eliminar");
                                $scope.estudio = {};
                            })


                        }, function(err) {
                            $ionicLoading.hide();
                            $scope.showAlert("Experiencia", "Error eliminar");
                            $scope.estudio = {};
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
                        $ionicLoading.show();
                        $scope.experiencia._idcv = $scope.user._id;
                        service.experienciaupdate($scope.experiencia).then(function(res) {
                            console.log("c");
                            $ionicLoading.hide();
                            $scope.showAlert("Experiencia", "editadob corretamente!");

                        }, function(err) {
                            $scope.showAlert("Experiencia", "Error editando");
                            $scope.estudio = {};
                            $ionicLoading.hide();
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
                    template: 'esta seguro que quiere eliminar esta informacion academica?'
                });
                confirmPopup.then(function(res) {
                    if (res) {

                        $ionicLoading.show();

                        service.estudiodelete($scope.estudio._id, $scope.user._id).then(function(res) {
                            service.finduser($scope.user._id).then(function(user) {


                                service.setUser(user.data);
                                $scope.user = service.getUser();
                                $ionicLoading.hide();
                                $scope.showAlert("Formacion", "se Elimino corretamente!");
                                $scope.estudio = {};

                            }, function(err) {
                                $ionicLoading.hide();
                                $scope.showAlert("Formacion", "Error eliminar");
                                $scope.estudio = {};

                            })


                        }, function(err) {
                            $ionicLoading.hide();
                            $scope.showAlert("Formacion", "Error eliminar");
                            $scope.estudio = {};
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
                        $ionicLoading.show();
                        $scope.estudio._idcv = $scope.user._id;
                        service.estudioupdate($scope.estudio).then(function(res) {
                            //    console.log(res.data);
                            $ionicLoading.hide();
                            $scope.showAlert("Formacion", "editadob corretamente!");

                        }, function(err) {
                            $scope.showAlert("Experiencia", "Error editando");
                            $scope.estudio = {};
                            $ionicLoading.hide();
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
            $ionicLoading.show();
            if ($scope.user) {
                $scope.experiencia._idcv = $scope.user._id;

                service.experiencianew($scope.experiencia).then(function(res) {
                    service.finduser($scope.user._id).then(function(user) {

                        console.log(user.data);
                        service.setUser(user.data);
                        $scope.user = service.getUser();
                        $ionicLoading.hide();
                        $scope.showAlert("Experiencia", "se agrego corretamente!");
                        $scope.experiencia = {};
                        //  $scope.Session.user = service.getUser();

                    })

                }, function(err) {
                    $ionicLoading.hide();
                    $scope.showAlert("Experiencia", "error al agregar ");
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
                $ionicLoading.show();
                $scope.estudio._idcv = $scope.user._id;

                service.estudionew($scope.estudio).then(function(res) {
                    // console.log(res.data);
                    service.finduser($scope.user._id).then(function(user) {

                        //console.log(user.data);
                        service.setUser(user.data);
                        $scope.user = service.getUser();

                        $scope.showAlert("Formacion", "se agrego corretamente!");
                        $scope.estudio = {};
                        // $scope.Session.user = service.getUser();
                        $ionicLoading.hide();

                    })

                }, function(err) {
                    $ionicLoading.hide();
                    $scope.showAlert("formacion", "error al agregar ");
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

        $scope.eliminarI = function(data) {
            $scope.idioma = data;
            var confirmPopup = $ionicPopup.confirm({
                title: "Eliminar",
                template: 'esta seguro que quiere eliminar este idioma?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $ionicLoading.show();
                    service.idiomadelete($scope.idioma._id, $scope.user._id).then(function(res) {
                        service.finduser($scope.user._id).then(function(user) {


                            service.setUser(user.data);
                            $scope.user = service.getUser();
                            $ionicLoading.hide();
                            $scope.showAlert("Idioma", "Eliminado corretamente!");
                            $scope.idioma = {};

                        }, function(err) {
                            $ionicLoading.hide();
                            $scope.showAlert("Idioma", "Error eliminar");
                            $scope.estudio = {};
                        })


                    }, function(err) {
                        $ionicLoading.hide();
                        $scope.showAlert("Idioma", "Error eliminar");
                        $scope.estudio = {};
                    })
                } else {

                }
            });
        }
        $scope.eliminarC = function(data) {
            $scope.competecia = data;
            var confirmPopup = $ionicPopup.confirm({
                title: "Eliminar",
                template: 'esta seguro que quiere eliminar este competencia?'
            });
            confirmPopup.then(function(res) {
                if (res) {
                    $ionicLoading.show();

                    service.competenciadelete($scope.competecia._id, $scope.user._id).then(function(res) {
                        service.finduser($scope.user._id).then(function(user) {


                            service.setUser(user.data);
                            $scope.user = service.getUser();
                            $ionicLoading.hide();
                            $scope.showAlert("Competencia", " Eliminado corretamente!");
                            $scope.competecia = {};
                        }, function(err) {
                            $ionicLoading.hide();
                            $scope.showAlert("Competecia", "Error eliminar");
                            $scope.estudio = {};
                        })


                    }, function(err) {
                        $ionicLoading.hide();
                        $scope.showAlert("Competencia", "Error eliminar");
                        $scope.estudio = {};
                    })
                } else {

                }
            });
        }

        // Perform the login action when the user submits the login form
        $scope.docvI = function() {

            if ($scope.user) {
                $ionicLoading.show();
                $scope.idioma._idcv = $scope.user._id;

                service.idiomanew($scope.idioma).then(function(res) {
                    service.finduser($scope.user._id).then(function(user) {

                        console.log(user.data);
                        service.setUser(user.data);
                        $scope.user = service.getUser();

                        $scope.showAlert("Idioma", "se agrego corretamente!");
                        $scope.idioma = {};
                        // $scope.Session.user = service.getUser();
                        $ionicLoading.hide();

                    })

                }, function(err) {
                    $ionicLoading.hide();
                    $scope.showAlert("Idioma", "error al agregar ");
                })
            }

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

            if ($scope.user) {
                $ionicLoading.show();
                $scope.competecia._idcv = $scope.user._id;

                service.competencianew($scope.competecia).then(function(res) {
                    service.finduser($scope.user._id).then(function(user) {

                        console.log(user.data);
                        service.setUser(user.data);
                        $scope.user = service.getUser();

                        $scope.showAlert("Competencia", "se agrego corretamente!");
                        $scope.competecia = {};
                        $ionicLoading.hide();

                    })

                }, function(err) {
                    $ionicLoading.hide();
                    $scope.showAlert("Competencia", "error agregando")
                })
            }
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
