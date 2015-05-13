app.controller('MainController', ['$scope', '$localStorage', function($scope, $localStorage){

  if ($localStorage.message) {
    $scope.enteredInput = $localStorage.message;
   }
  else { 
    $scope.enteredInput = [];
  }

  $scope.submitInput = function() {
    $scope.enteredInput.push({
      rating: {
        likes: 0,
        dislikes: 0
      },
      'storedInput': $scope.userInput,
      'date': $scope.pubDate = new Date() //
    });
    $localStorage.message = $scope.enteredInput;
    $scope.userInput = '';
  };

  $scope.delete = function(index){
    $scope.enteredInput.splice(index, 1);
    $localStorage.message = $scope.enteredInput;
  };

  $scope.thumbsUp = function(input){
    input.rating.likes += 1;
    if ($scope.enteredInput[input].rating.dislikes > 0){
      $scope.enteredInput[input].rating.dislikes -= 1;
    }
  };

  $scope.thumbsDown = function(input){
    input.rating.dislikes += 1;
    if ($scope.enteredInput[input].rating.likes > 0){
      $scope.enteredInput[input].rating.likes -= 1;
    }
  };
}]);