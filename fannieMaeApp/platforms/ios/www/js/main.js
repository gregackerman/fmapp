var busyIndicatorGlobal;
var portfolioGlobal;
var selectedPortfolio;
var selectedSubPortfolio;
var selectedAsset;

function wlCommonInit() {
  console.log("Loading Angular");

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
  });

  busyIndicatorGlobal = new WL.BusyIndicator('content');

	WL.Client.connect({onSuccess: connectSuccess, onFailure: connectFailure});
}


function connectSuccess() {
    console.log("*******  Hey I am connected to MFP Server **********");

    if (WL && WL.Client.Push) {
        WL.Client.Push.onMessage = function(props, payload) {
            var msg = typeof props.alert === 'string' ? props.alert : props.alert.body;
            WL.SimpleDialog.show('Notification', msg, [{
                text: 'Close',
                handler: function() {}
            }]);
        };
    }
}

function connectFailure() {
    alert("*******  Failed to connect to MFP Server **********");
}
