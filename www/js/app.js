angular.module('starter', [
  'ionic',
  'starter.services', 
  'starter.controllers', 
  'firebase',
  'ngCordova',
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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
  })
  .state('app.productos', {
      url: '/productos',
      views: {
        'menuContent': {
          templateUrl: 'templates/productos.html',
          controller: 'ProductosCtrl'
        }
      }
    })
  .state('app.producto', {
    url: '/productos/:productoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/producto.html',
        controller: 'ProductoCtrl'
      }
    }
  })
  .state('editar', {
    url: '/editar/:id',
    parent: "app",
    cache: true,
     resolve:{
        id: ['$stateParams', function($stateParams){
            return $stateParams.id;
        }]
     },    
    views:{
      'menuContent':{
        templateUrl: 'templates/modificar_producto.html',
        controller: 'EditCtrl'
      }
    }
  })
  .state('foto', {
    url: '/producto-fotos/:id',
    parent: "app",
    cache: true,
     resolve:{
        id: ['$stateParams', function($stateParams){
            return $stateParams.id;
        }]
     },    
    views:{
      'menuContent':{
        templateUrl: 'templates/producto_fotos.html',
        controller: 'ProductoFotosCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/productos');
});
