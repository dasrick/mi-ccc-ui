'use strict';

/**
 * @ngInject
 */
module.exports = function (Customer, $translate, $scope, $state, DS) {
  var getDetails;
  $scope.$watch('customer.selectedCountry', function (country) {
    if (country != null) {
      if ($scope.customer.address == null) {
        $scope.customer.address = {};
      }
      $scope.customer.address.country = country.short;
    }
  });
  $scope.$on('cache_clear_customer', function () {
    getDetails();
  });
  getDetails = function () {
    Customer.getCustomerDetail($state.params.id).then(function (value) {
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
        if (($scope.customer.address != null) && ($scope.customer.address.country != null)) {
          country = DS.get('country', $scope.customer.address.country);
          if (country != null) {
            $scope.customer.selectedCountry = country;
          }
        }
      });
    });
  };
  getDetails();
  Customer.getCurrentCustomer().then(function (value) {
    $scope.types = ['consumer'];
    if (value.type === 'admin') {
      $scope.types.push('partner');
    }
  });
  $scope.save = function () {
    delete $scope.customer.parent;
    delete $scope.customer.selectedCountry;
    Customer.editCustomer($scope.customer).then(function () {
      $state.go('^.^.list');
    });
  };
};
