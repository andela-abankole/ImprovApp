app.controller('MainController', 
['$scope', function($scope){
  $scope.enteredInput = [{
    'storedInput': 'Stand Up Comedy'
  }];

  $scope.submitInput = function() {
    $scope.enteredInput.push({
      'storedInput': $scope.userInput
    });
  };

  // $scope.trending = $scope.enteredInput[0].storedInput;

  $scope.delete = function(index){
    $scope.enteredInput.splice(index, 1);
  };

  $scope.pubdate = new Date();

  $scope.rating = {
                    likes: 0,
                    dislikes: 0
                };

  $scope.thumbsUp = function(index){
    $scope.rating.likes += 1;
  };

  $scope.thumbsDown = function(index){
    $scope.rating.dislikes += 1;
  };

}]);