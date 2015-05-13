app.controller('MainController', ['$scope', '$localStorage', function($scope, $localStorage){
  
  $scope.defaultInput = [{
    rating: {
      likes: 10,
      dislikes: 2
    },
    'storedInput': 'Stand Up Comedy'
  },
  {
    rating: {
      likes: 5,
      dislikes: 1
    },
    'storedInput': 'Random Games'
  }];

  if (!$localStorage.message) {
    $localStorage.message = $scope.defaultInput;
   }
  else { 
    $scope.enteredInput = $localStorage.message;
  }

  $scope.submitInput = function() {
    $scope.enteredInput.push({
      rating: {
        likes: 0,
        dislikes: 0
      },
      'storedInput': $scope.userInput
    });
    $localStorage.message = $scope.enteredInput;
    $scope.userInput = '';
  };

  $scope.delete = function(index){
    $scope.enteredInput.splice(index, 1);
    $localStorage.message = $scope.enteredInput;
  };

  $scope.pubDate = new Date();


  $scope.thumbsUp = function(index){
    $scope.enteredInput[index].rating.likes += 1;
  };

  $scope.thumbsDown = function(index){
    $scope.enteredInput[index].rating.dislikes += 1;
  };

}]);