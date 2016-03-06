'use strict';

//status btn
App.directive('statusButton', [
  '$timeout',
  'BadgeFactory',
  'EventFactory',
  'PolygonFactory',
  'UserFactory',
  '$rootScope',
  '$http',
  function(
    $timeout,
    BadgeFactory,
    EventFactory,
    PolygonFactory,
    UserFactory,
    $rootScope,
    $http
  ){
    return {
      restrict: 'AEC',
      templateUrl : "/modules/map/views/statusBtn.html",
      scope: {
        statusOnClick: '&statusonclick',
        handlerclick: '&'
      },
      link: function(scope, element, attrs) {
        console.log(scope)
        scope.badge = BadgeFactory.getBadges();
        scope.eventId = EventFactory.getEventId();
        scope.feature = PolygonFactory.getFeature();

        //default images for each status button
        scope.damageImg  = '/assets/img/damage.png';
        scope.fineImg    = '/assets/img/fine.png';
        scope.unknownImg = '/assets/img/unknown.png';
        scope.nextImg    = '/assets/img/next.png';

        var timer = null;
        //status buttons onclick
        scope.btnAction = function(status){

          //save to database
          function saveStatus(status){
            var eventId = scope.eventId;
            var polygonId = scope.feature.id;
            var username = UserFactory.getUserData().data.username;

            var data = {
              username: username,
              status: status
            }

            console.log(status +  ' saved to database');

            $http.post('http://52.8.54.187:3000/event/' + eventId + '/polygon/' + polygonId, data)
              .then(function(response){
                console.log(response);
              }, function(error){
                console.log(error);
              });
          }

          switch(status + 'no save'){
            case 'damage':

              if(timer){
                $timeout.cancel(timer);
                timer = null;
              }

              timer = $timeout(function(){
                saveStatus('DAMAGE');
              }, 3000);

              break;
            case 'undamage':

              if(timer){
                $timeout.cancel(timer);
                timer = null;
              }
              timer = $timeout(function(){
                saveStatus('NO_DAMAGE');
              }, 3000);

              break;
            case 'unknown':

              if(timer){
                $timeout.cancel(timer);
                timer = null;
              }
              timer = $timeout(function(){
                saveStatus('UNSURE');
              }, 3000);

              break;
          }

          $rootScope.$emit('featureStatusChange', {status : status});
        }

        $rootScope.$on('badge_update', function(){
          scope.badge = BadgeFactory.getBadges();
        });

        $rootScope.$on('event_update', function(){
          scope.eventId = EventFactory.getEventId();
        });

        $rootScope.$on('Polygon_update', function(){
          scope.feature = PolygonFactory.getFeature();
        });
      }
    }
}]);
