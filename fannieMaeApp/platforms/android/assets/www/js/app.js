// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'highcharts-ng'])


///////////////MFPADD//////////////////////////////
 //Adding support for cordova.
        .run(function($ionicPlatform) {

           console.log('>> ibmApp.run ...');

           $ionicPlatform.ready(function() {
             // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
             // for form inputs)
             console.log('>> ibmApp.ready ...');
             if (window.cordova &&
                 window.cordova.plugins &&
                 window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
             }
             if(window.StatusBar) {
               StatusBar.styleDefault();
             }
           });

         })

        .config(function($ionicConfigProvider) {
            // by default tabs on Android will show up on the top, and bottom for iOS. this will make all bottom
            $ionicConfigProvider.tabs.position("bottom");
        });
/////////////////////////////////////////////
