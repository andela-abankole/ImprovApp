/**
 * @author akinjide.bankole@andela.co (Akinjide Bankole 2015)
 */
app.controller('MainController', ['$scope', '$localStorage', function($scope, $localStorage){
  //Sets to empty
  $scope.userInput = "";
  //checks if the localStorage has been set
  if($localStorage.store) {
    $scope.enteredInput = $localStorage.store; //Assigns localStorage content to the view
  }
  else { 
    $scope.enteredInput = []; //Creates a new array if the localStorage is 
  }

  /**toastr is a Javascript library for non-blocking notifications.
    * jQuery is required. 
    *The goal is to create a simple core library that can be customized and extended.
    */
  //runs when this function is called
  $scope.check = function() {
    // Display an info toast with title
    $scope.toast = toastr["info"]("Please! Title and Description cannot be empty.", "Error! You Entered Nothing")
    //toastr properties
    toastr.options = {
      "closeButton": true,
      "newestOnTop": true,
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
    //checks if the inputs are not empty, if they are not empty if will execute
    if($scope.userInput !== ""){
      //Pushes this object to the empty array stacking from the front
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
        $localStorage.store = $scope.enteredInput; //Store the array into localStorage
        $scope.userInput = ''; //Refreshes the user input
        $scope.userBody = ''; //Refreshes the user description
    }
    //will execute if inputs are empty
    else {
      //calls the $scope.check function
      $scope.check();
    }
  }

  /**
   * Called by the delete button 
   * and deletes from "localstorage" and from "enteredInput"
   */
  $scope.delete = function(index){
    $scope.enteredInput.splice(index, 1);
    $localStorage.store = $scope.enteredInput;
  }

  /**
   * runs when the like button  is pressed
   * and increases like by 1 in "localstorage" and "enteredInput"
   */
  $scope.thumbsUp = function(input){
    //checks if disklike and like is 0, adds 1 to likes if the condition is satisfied
    if((input.rating.dislikes === 0)&&(input.rating.likes === 0)){
      //increments likes by 1
      input.rating.likes += 1;
    }
    //checks if dislikes is 1
    else if(input.rating.dislikes === 1){
      //if dislikes is 1, substracts
      input.rating.dislikes -= 1;
      //if and increments likes with 1
      input.rating.likes += 1;
    }
  }

  /**
   * runs when the dislike button is pressed
   * and increases dislike by 1 in "localstorage" and "enteredInput"
   */
  $scope.thumbsDown = function(input){
    //checks if disklike and like is 0, adds 1 to dislikes if the condition is satisfied
    if((input.rating.dislikes === 0)&&(input.rating.likes === 0)){
      //increments dislikes by 1
      input.rating.dislikes += 1;
    }
    //checks if likes is 1
    else if(input.rating.likes === 1){
      //if likes is 1, substracts
      input.rating.likes -= 1;
      //if and increments dislikes with 1
      input.rating.dislikes += 1;
    }
  }
}]);