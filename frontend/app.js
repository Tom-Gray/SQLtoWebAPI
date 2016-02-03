var app = angular.module('statusApp', []);
      app.controller('CountryCtrl', function ($scope, $http){
        $http.get('http://localhost:9000/employees/').success(function(data) {
          $scope.countries = data;
        });
      });
      
      