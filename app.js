var app=angular.module('movieApp',['ngRoute']);
app.factory('Data',['$http','$q',function($http,$q){
	var datafactory={};
	datafactory.getListData= function(){
	   var temp={};
	   var listurl='http://api.themoviedb.org/3/movie/popular?api_key=69961736ee88b39584ba695c3da7a759';
	   var defer= $q.defer();
	   $http.get(listurl).success(function(data){
	   	  temp=data;
	   	  defer.resolve(data);
	   });
	   return defer.promise;
	};
	datafactory.getMovieData=function(id){
		var movieurl='https://api.themoviedb.org/3/movie/'+id+'?api_key=69961736ee88b39584ba695c3da7a759';
       var defer=$q.defer();
       $http.get(movieurl).success(function(data){
       	defer.resolve(data);
       });
       return defer.promise;
	};

	return datafactory;

}]);
app.controller('MainCtrl',function($scope,Data,$http){
$scope.name="sakshi";
var url='http://api.themoviedb.org/3/movie/popular?api_key=69961736ee88b39584ba695c3da7a759';
//$scope.data=
Data.getListData().then(function(data){
	$scope.movielist=data.results;
});
});
app.controller('MovieCtrl',function($scope,$routeParams,Data){
	$scope.name='surbhi';
	$scope.param=$routeParams.id;
    Data.getMovieData($scope.param).then(function(data){
      $scope.moviedetails=data;
    });

});
app.config(function($routeProvider,$locationProvider){
$routeProvider.when('/movie/:id',{
	templateUrl:'movie_detail.html',
	controller:'MovieCtrl'
}).when('/',{
   templateUrl:'movie_list.html',
   controller:'MainCtrl'
}).otherwise({
    redirectTo:'/'
});
});