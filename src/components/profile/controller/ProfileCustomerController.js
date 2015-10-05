'use strict';

/**
 * @ngInject
 */
module.exports = function (Customer, $translate, $scope, User, DS) {
  var customer;
  customer = User.getCurrentUser().customer;
  $scope.countrySelect = function (country) {
    $scope.customer.address.country = country.short;
  };
  Customer.getCustomerDetail(customer.id).then(function (value) {
    $scope.customer = value;
    if ($scope.customer.parent) {
      $scope.customer.parent = $scope.customer.parent.id;
    }
    DS.findAll('country', {
      locale: $translate.preferredLanguage()
    });
    $scope.$watch(function () {
      return DS.lastModified('country');
    }, function () {
      var country;
      $scope.countries = DS.filter('country', {});
      if ($scope.customer.address.country != null) {
        country = DS.get('country', $scope.customer.address.country);
        if (country != null) {
          $scope.selectedCountry = country.name;
        }
      }
      $scope.masterCustomer = angular.copy($scope.customer);
    });
  });
  $scope.isUnchanged = function () {
    return angular.equals($scope.customer, $scope.masterCustomer);
  };
  $scope.reset = function () {
    angular.copy($scope.masterCustomer, $scope.customer);
  };
  $scope.save = function () {
    Customer.editCustomer($scope.customer).then(function () {
      $scope.masterCustomer = angular.copy($scope.customer);
      $scope.$emit('alert', 'success', 'customer.edit.success');
    });
  };
};
