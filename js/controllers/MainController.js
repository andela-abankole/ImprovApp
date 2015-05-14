/**
 * @author akinjide.bankole@andela.co (Akinjide Bankole 2015)
 */
app.controller('MainController', ['$scope', '$localStorage', function($scope, $localStorage){
  $scope.userInput = "";
  //checks if the localStorage has been set
  if ($localStorage.message) {
    $scope.enteredInput = $localStorage.message; //Assigns localStorage content to the view
  }
  else { 
    $scope.enteredInput = []; //Creates a new array if the localStorage is 
  }
  $scope.check = function() {
    $scope.toast = toastr["info"]("Please! Title your Improv and Add a Description", "Error")

    toastr.options = {
      "positionClass": "toast-top-right",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing", 
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }  

  //Executes when the write button is clicked
  $scope.submitInput = function() {
     //Pushes this object to the empty array stacking from the front
  if ($scope.userInput !== ""){
    $scope.enteredInput.unshift({
      //Default value for both like and unilke
      rating: {
        likes: 0,
        dislikes: 0
      },
      'storedInput': $scope.userInput, //Stores user input into stored input
      'storedBody': $scope.userBody, //Stores user description into stored Body
      'date': $scope.pubDate = new Date() //Gets current date and stores into date
    });
    $localStorage.message = $scope.enteredInput; //Store the array into localStorage
    $scope.userInput = ''; //Refreshes the user input
    $scope.userBody = ''; //Refreshes the user description
    }
    else {
      $scope.check();
    }
  };

  $scope.delete = function(index){
    $scope.enteredInput.splice(index, 1);
    $localStorage.message = $scope.enteredInput;
  };

  $scope.thumbsUp = function(input){
    if ((input.rating.dislikes === 0)&&(input.rating.likes === 0)){
      input.rating.likes += 1;
    }
    else if(input.rating.dislikes === 1){
      input.rating.dislikes -= 1;
      input.rating.likes += 1;
    }
  };

  $scope.thumbsDown = function(input){
    if ((input.rating.dislikes === 0)&&(input.rating.likes === 0)){
      input.rating.dislikes += 1;
    }
    else if (input.rating.likes === 1){
      input.rating.likes -= 1;
      input.rating.dislikes += 1;
    }
  };

  //controls the enter button when its pushed 
  $scope.enter = function(keyEvent) {
  if (keyEvent.which === 13)
    $scope.submitInput;
  }
}]);