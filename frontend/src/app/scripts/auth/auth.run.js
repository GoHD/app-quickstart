(function() {
  'use strict';

  angular
    .module('gohd')
    .run(runBlock);

  /* @ngInject */
  function runBlock($state, AuthService, $rootScope, AUTH_EVENTS, $timeout) {

    $rootScope.$on("$stateChangeStart", function(event, toState /*, toParams, fromState, fromParams*/ ) {
      if (toState.authenticate && AuthService.isAuthenticated === false) {
        event.preventDefault();
        $state.transitionTo("login");
      }
    });

    function login() {
        $timeout(function(){
            $state.go('login');
        });
    }

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
        $state.go('gohd');
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function () {
        login();
    });

    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
        login();
    });

    $rootScope.$on(AUTH_EVENTS.forbidden, function () {
        login();
    });

    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
        login();
    });
  }
})();