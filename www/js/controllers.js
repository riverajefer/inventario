angular.module('starter.controllers', [])

.controller('ProductosCtrl', function($scope, $state, $ionicModal, Productos, $ionicActionSheet, $firebaseArray, $ionicListDelegate) {


  $scope.showActionsheet = function(producto) {
    console.log(producto)
    
    $ionicActionSheet.show({
      titleText: 'Producto: '+producto.nombre,
      buttons: [
        { text: '<i class="icon ion-ios-arrow-right"></i> Detalles' },
        { text: '<i class="icon ion-ios-compose-outline"></i> Editar' },
        { text: '<i class="icon ion-ios-trash-outline"></i> Eliminar' },
      ],
      destructiveText: '<i class="icon ion-ios-close-outline"></i> Cancelar',
      cancelText: '<i class="icon ion-ios-close-outline"></i> Cancelar',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        switch(index) {
            case 0:
                $state.go('app.producto', { id: producto.$id });
                break;
            case 1:
                $state.go('editar', { id: producto.$id });
                break;
            case 2:
                $scope.delete(producto.$id);
                break;
            default:
                console.log('default')
        }        
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };
    


   $scope.productos = Productos;

   $ionicModal.fromTemplateUrl('templates/agregar_producto.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.openModalAddProducto = function(){
    $scope.modal.show();
  };

 $scope.addProducto = function(producto) {

    if(producto){
        $scope.productos.$add({
          "nombre": producto.nombre,
          "referencia": producto.referencia,
          "cantidad": producto.cantidad,
          "precio": producto.precio,          
          "detalles": producto.detalles,
        });
        $scope.modal.hide();
    }
  };

$scope.edit = function(data){
  console.log(data);
}

$scope.delete = function(data){
  var fredRef = new Firebase('https://appinventario.firebaseio.com/productos/' + data);
  fredRef.remove();  
  $ionicListDelegate.closeOptionButtons()
 
}

})

.controller('ProductoCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicPopover, Productos) {
  
   function findbyid(id){
    for (var i = 0; i < Productos.length; i++) {
      if(Productos[i].$id == id){
        return Productos[i];
      }
    };
  }

  var detalles = findbyid($stateParams.productoId);
  $scope.producto = detalles;


})
.controller('EditCtrl', function($scope, $stateParams, $state, $ionicListDelegate, $ionicNavBarDelegate, $ionicPopover, Productos) {
  
  $ionicListDelegate.closeOptionButtons();
  
   function findbyid(id){
    for (var i = 0; i < Productos.length; i++) {
      if(Productos[i].$id == id){
        return Productos[i];
      }
    };
  }

  var detalles = findbyid($stateParams.id);
  console.log(detalles);
  $scope.producto = detalles;

$scope.modificarProducto = function(data){

  var fredRef = new Firebase('https://appinventario.firebaseio.com/productos/' + data.$id);
  fredRef.update({ 
    nombre: data.nombre, 
    cantidad: data.cantidad,
    referencia: data.referencia,
    precio: data.precio,
    detalles: data.detalles,
  });
  $ionicListDelegate.closeOptionButtons();
  $state.go('app.productos');

}


});



