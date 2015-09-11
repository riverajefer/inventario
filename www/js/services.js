var service  = angular.module('starter.services', []);
service.factory("Productos", function($firebaseArray) {
	var itemsRef = new Firebase("https://appinventario.firebaseio.com/productos");
  	return $firebaseArray(itemsRef);		
  
});

service.factory("Fotos", function($firebaseArray) {
	var itemsRef = new Firebase("https://appinventario.firebaseio.com/fotos");
  	return $firebaseArray(itemsRef);		
  
});