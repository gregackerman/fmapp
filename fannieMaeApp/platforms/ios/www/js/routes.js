angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  // if none of states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/portfolio');

  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.portfolio', {
    url: '/portfolio',
    views: {
      'tab-portfolio': {
        templateUrl: 'templates/tab-portfolio.html',
        controller: 'PortfolioController'
      }
    }
  })

  .state('tab.subportfolio', {
    url: '/subportfolio/:portfolioId',
    views: {
      'tab-subportfolio': {
        templateUrl: 'templates/tab-subportfolio.html',
        controller: 'SubPortfolioController'
      }
    }
  })

  .state('tab.assets', {
    url: '/assets/:subPortId',
    views: {
      'tab-assets': {
        templateUrl: 'templates/tab-assets.html',
        controller: 'AssetController'
      }
    }
  })

  .state('tab.assetdetail', {
    url: '/assetdetail/:assetId',
    views: {
      'tab-assetdetail': {
        templateUrl: 'templates/tab-assetdetail.html',
        controller: 'AssetDetailController'
      }
    }
  });

});
