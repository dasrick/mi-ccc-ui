'use strict';

module.exports = {
  'admin.product': {
    abstract: true,
    url: '/product-management',
    views: {
      'data': {
        templateUrl: '/views/product/base.html'
      },
      'header@': {
        templateUrl: '/views/product/header.html'
      }
    }
  },
  'admin.product.list': {
    url: '',
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.list.label</span>"
      },
      '@admin.product': {
        templateUrl: '/views/product/list.html',
        controller: 'Product.ListController'
      }
    }
  },
  'admin.product.new': {
    url: '/new',
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.new.label</span>"
      },
      '@admin.product': {
        templateUrl: '/views/product/new.html'
      }
    }
  },
  'admin.product.new.product': {
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.new.label</span>"
      },
      'form': {
        templateUrl: '/views/product/product_form.html',
        controller: 'Product.NewProductController'
      }
    }
  },
  'admin.product.new.feature': {
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.new.label</span>"
      },
      'form': {
        templateUrl: '/views/product/feature_form.html',
        controller: 'Product.NewFeatureController'
      }
    }
  },
  'admin.product.detail': {
    abstract: true,
    url: '/{id:[0-9a-zA-Z]{1,}}'
  },
  'admin.product.detail.edit_product': {
    url: '/edit-product',
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.edit_product.label</span>"
      },
      '@admin.product': {
        templateUrl: '/views/product/product_form.html',
        controller: 'Product.EditProductController'
      }
    }
  },
  'admin.product.detail.edit_feature': {
    url: '/edit-feature',
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.edit_feature.label</span>"
      },
      '@admin.product': {
        templateUrl: '/views/product/feature_form.html',
        controller: 'Product.EditFeatureController'
      }
    }
  },
  "admin.product.detail.assignment_overview": {
    url: "/assignment/{type}",
    views: {
      'titleExtension@admin.product': {
        template: "<span> - </span><span translate>product.assignment_overview.label</span>"
      },
      '@admin.product': {
        templateUrl: '/views/product/assignment.html',
        controller: 'Product.AssignmentController'
      }
    }
  }
};