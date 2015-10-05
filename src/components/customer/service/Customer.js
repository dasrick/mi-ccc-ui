'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state, $rootScope, $q, CacheFactory) {
  var error;
  error = function (error) {
    $rootScope.$emit('alert', 'danger', error.message, error);
    return $q.reject(error);
  };
  return {
    getCustomers: function (parent) {
      var httpCall, params, success;
      if (parent == null) {
        parent = null;
      }
      success = function (data) {
        if (angular.isArray(data.data)) {
          return data.data;
        } else {
          data.message = 'get_customers.error.backend';
          return error(data);
        }
      };
      params = {};
      if (parent != null) {
        params.parent = parent;
      }
      httpCall = {
        method: 'GET',
        url: '/api/customers',
        cache: true,
        params: params,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    getCustomerDetail: function (id) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 200) {
          return data.data;
        } else {
          data.message = 'get_customer.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'GET',
        cache: true,
        url: '/api/customers/' + id,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    getCurrentCustomer: function () {
      var userDataCache;
      if (($state.params.customerId == null) || $state.params.customerId === '') {
        userDataCache = CacheFactory.get('userData');
        $state.params.customerId = userDataCache.get('customerId');
      }
      return this.getCustomers().then(function (value) {
        var customer, _i, _len;
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          customer = value[_i];
          if (customer.id === parseInt($state.params.customerId, 10)) {
            return customer;
          }
        }
      });
    },
    createCustomer: function (customer) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 201) {
          return true;
        } else {
          data.message = 'new_customers.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'POST',
        url: '/api/customers',
        data: customer,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    editCustomer: function (customer) {
      var editCustomer, httpCall, success;
      editCustomer = angular.copy(customer);
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'edit_customers.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: '/api/customers/' + editCustomer.id,
        data: editCustomer,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall).then(success, error);
    },
    deleteCustomer: function (customerId, reviewer) {
      var httpCall, success;
      success = function (data) {
        if (data.status === 204) {
          return true;
        } else {
          data.message = 'customer.delete.error.backend';
          return error(data);
        }
      };
      httpCall = {
        method: 'PUT',
        url: "/api/customers/" + customerId + "/review",
        headers: {
          Accept: 'application/json'
        },
        data: {
          reviewer: reviewer,
          baseUrl: $state.href("profile.reviews.detail", {}, {
            absolute: true
          })
        }
      };
      return HttpService(httpCall).then(success, error);
    }
  };
};
