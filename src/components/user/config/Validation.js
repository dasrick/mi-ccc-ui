'use strict';

module.exports = [
  {
    url: '/users',
    method: 'POST',
    status: 201,
    message: 'user.create.error.backend'
  }, {
    url: '/users/{userId:[0-9a-zA-Z]{1,}}/roles',
    method: 'PUT',
    status: 204,
    message: 'user.edit_roles.error.backend'
  }, {
    url: '/users/{userId:[0-9a-zA-Z]{1,}}',
    method: 'PUT',
    status: 204,
    message: 'user.update.error.backend'
  }, {
    url: '/users/{userId:[0-9a-zA-Z]{1,}}',
    method: 'GET',
    status: 200,
    message: 'user.get.error.backend',
    type: 'object'
  }, {
    url: '/security/request-password/{email}',
    method: 'PUT',
    status: 204,
    message: 'user.request_password.error.backend'
  }
];
