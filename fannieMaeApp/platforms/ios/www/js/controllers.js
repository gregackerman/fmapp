angular.module('app.controllers', [])

.controller('AssetDetailController', function($scope, $stateParams) {
  console.log("Selected asset", $stateParams);
  console.log("Current global set", portfolioGlobal);

  selectedAsset = $stateParams.assetId;

  var filteredData = $.grep(portfolioGlobal, function(element, index) {
    return element.doc.AssetID == selectedAsset;
  });

  console.log("Got ONE asset AFTER filter", filteredData);
  $scope.assetDetailList = filteredData;

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'spline'
      }
    },
    series: [{
      data: [3.04, 2.84, 2.7, 2.24, 3.50],
      showInLegend: false
    }],
    title: {
      text: 'TQI Trend'
    },

    loading: false
  };
})


.controller('AssetController', function($scope, $stateParams) {
  console.log("Selected subPortfolio", $stateParams);
  console.log("Current global set", portfolioGlobal);

  selectedSubPortfolio = $stateParams.subPortId;
  $scope.listOfOptions = {'All':'All', 'Run Day to Day':'Run Day to Day', 'Target State':'Target State'};
  $scope.selectedItem = 'All';

  $scope.selectedItemChanged = function(selected) {
    if (!selected || selected == 'All') {
      $scope.assetList = $.grep(portfolioGlobal, function(element, index) {
        return element.doc.Portfolio == selectedPortfolio &&
          element.doc.SubPortfolio == selectedSubPortfolio;
      });
      console.log("Selected in All", selected, $scope.assetList);
    } else {
      $scope.assetList = $.grep(portfolioGlobal, function(element, index) {
        return element.doc.Portfolio == selectedPortfolio &&
          element.doc.SubPortfolio == selectedSubPortfolio &&
          element.doc.DevStatus == selected;
      });
      console.log("Selected in else", selected, $scope.assetList);
    }
  }

  var filteredData = $.grep(portfolioGlobal, function(element, index) {
    return element.doc.Portfolio == selectedPortfolio &&
      element.doc.SubPortfolio == selectedSubPortfolio;
  });

  console.log("Got assets AFTER filter", filteredData);
  $scope.assetList = filteredData;
})


.controller('SubPortfolioController', function($scope, $stateParams) {
  console.log("Selected Portfolio", $stateParams);
  console.log("Current global set", portfolioGlobal);

  selectedPortfolio = $stateParams.portfolioId;

  var filteredData = $.grep(portfolioGlobal, function(element, index) {
    return element.doc.Portfolio == $stateParams.portfolioId;
  });

  console.log("Got subPortfolio AFTER filter", filteredData);
  $scope.subPortList = filteredData;
  /*
  var data = { "items":[
      {
          "id":           1,
          "category":      "cat1"
      },
      {
          "id":           1,
          "category":      "cat2"
      },
      {
          "id":           1,
          "category":      "cat1"
      }
  ]};

      var returnedData = $.grep(data.items, function(element, index){
            return element.id == 1 && element.category == "cat2";
      });

    alert(JSON.stringify(returnedData));
    */
})

.controller('PortfolioController', function($scope, accountsService, busyIndicator) {

  $scope.getPortfolio = function() {
    $scope.accounts = [];
    $scope.errorMsg = "";
    busyIndicator.show();
    console.log("Calling Account Service", $scope);
    accountsService().then(function(accounts) {
        console.log("Got Accounts", accounts);
        portfolioGlobal = accounts;

        var accountShort = [];
        for (i = 0; i < accounts.length; i++) {
          if (accountShort.indexOf(accounts[i].doc.Portfolio) == -1)
            accountShort.push(accounts[i].doc.Portfolio);
        }

        $scope.accounts = accountShort;
        $scope.$broadcast('scroll.refreshComplete');
        busyIndicator.hide();
        $scope.errorMsg = "";
      },
      function(error) {
        $scope.errorMsg = "Could Not Load Accounts";
        $scope.$broadcast('scroll.refreshComplete');
        busyIndicator.hide();
      });
  };

  $scope.getPortfolio();
  console.log("PortfolioController", $scope);

  var pushSupport = WL.Client.Push.isPushSupported();
  if (pushSupport == true) {
    console.log('---> push supported');
    subscribeToSampleTag1();
  } else {
    console.log('---> push is not supported');
  }

})




.controller('LoginController', function($scope, $ionicModal, busyIndicator) {

  console.log("LoginController");
  $scope.userName = "";
  $scope.password = "";
  $scope.errorLoginMsg = null;
  $scope.loginLoaded = false;

  $scope.isCustomResponse = function(response) {
    console.log("Challenge Required...", response);
    if (!response || !response.responseJSON || response.responseText === null) {
      return false;
    }
    if (typeof(response.responseJSON.authRequired) !== 'undefined') {
      $scope.errorLoginMsg = response.responseJSON.errorMessage;
      return true;
    } else {
      return false;
    }
  };


  $scope.handleChallenge = function(response) {
    console.log("Handle Challenge", response);
    var authRequired = response.responseJSON.authRequired;
    busyIndicator.hide();
    if (authRequired == true) {
      console.log("Loading Modal...", $ionicModal);
      if (!$scope.loginLoaded) {
        $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {

          $scope.loginLoaded = true;
          $scope.modal = modal;
          $scope.modal.show();

        }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up'
        });
      }
      $("#errorLoginMsg").html(response.responseJSON.errorMessage);
      console.log("Login Page Loaded");

    } else if (authRequired == false) {
      console.log("Challenge Not Required");
      location.hash = "tabsController.portfolios";
      $scope.sampleAppRealmChallengeHandler.submitSuccess();
      $scope.modal.hide();
      return false;
    }
  };


  $scope.submitLogin = function() {
    console.log("submit login", $scope);
    var options = {
      parameters: [$('#usernameInputField').val(), $('#passwordInputField').val()],
      adapter: "AuthAdapter",
      procedure: "submitAuthentication"
    };
    $scope.sampleAppRealmChallengeHandler.submitAdapterAuthentication(options, {});
  };

  $scope.sampleAppRealmChallengeHandler = WL.Client.createChallengeHandler("AdapterSecurityTest");
  $scope.sampleAppRealmChallengeHandler.isCustomResponse = $scope.isCustomResponse;
  $scope.sampleAppRealmChallengeHandler.handleChallenge = $scope.handleChallenge;
});
