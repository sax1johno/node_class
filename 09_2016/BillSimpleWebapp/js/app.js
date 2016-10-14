angular.module("test", [])
.controller("MyController", function($http, currency) {
    $http.get("http://google.com");
    currency.formatCurrency();
})