/**
 * @author akinjide.bankole@andela.co (Akinjide Bankole 2015)
 */
app.controller('MainController', ['$scope', '$localStorage', function($scope, $localStorage){
  //Sets to empty
  $scope.userInput = "";
  $scope.userDescription = "";

  $scope.improvs = [{
    rating: {
      likes: 10,
      dislikes: 3
    },
    //Stores user input into stored input
    'post_title': "Scare Off the Bench",
    //Stores user description into stored Body
    'post_description': "The key to this game is repulsion: consisting of a 'bench resident' and a newcomer, it is the job of each newcomer to find an imaginitive way to, as the name of the game implies, scare the bench dweller off so as to assume their position (and so on). This game invites a maximal amount of players, more heads to provide more inventive ways of inducing unsettling horror (respecting laws of public decency of course, no need to re-enact a Jim Morrison, as long as it's all pantomimed). Bench dwellers, to increase intensity, can be resistant at first (to up the ante), so long as they don't play Mr. Brave and ruin the entire game for everyone.", 
    'date': new Date() 
  },
  {
    rating: {
      likes: 20,
      dislikes: 18
    },
    //Stores user input into stored input
    'post_title': "The Dating Game",
    //Stores user description into stored Body
    'post_description': "This game is fun as it involves a bit of mystery: the assorted 'bachelors' (any more than three would be over-indulgent) are comprised of any given identity in a hat, as self-invented or supplied by a pooling audience, which the chooser must identify after each has been given a moderate amount of time to express themselves (perhaps two or three rounds, so the game doesn't drag on and/or other participants can get a turn). The chooser, in order to get a juicy response from each contestant, should ask provocative/evocative questions to up the hilarity and revelation opportunities.", 
    'date': new Date() 
  }]

  /**checks if the localStorage has been set
    *If set, Assigns localStorage content to improvs
    *If not set, Creates a new array of improvs 
    */
   if($localStorage.store){
    $scope.improvs = $localStorage.store
   } else {
    $localStorage.store = $scope.improvs
   }

  //Executes when the write button is clicked
  $scope.submitInput = function() {
    //checks if the inputs are empty, if they are empty IF condition will execute
    if(($scope.userInput === "") || ($scope.userDescription === "")){
      //calls the $scope.check function
      
      /**toastr is a Javascript library for non-blocking notifications.
        *jQuery is required. 
        *The goal is to create a simple core library that can be customized and extended.
        */
      //runs when this function is called
      $scope.check = function() {
        // Display an info toast with title
        $scope.toast = toastr["info"]("Please! Title and Description cannot be empty.", "Error!")
        //toastr properties
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": true,
          "progressBar": false,
          "positionClass": "toast-top-right",
          "preventDuplicates": true,
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
    }
    //if inputs are not empty, this part will run
    else {
      //Pushes this object to the empty array stacking from the front
      $scope.improvs.unshift({
        //Default value for both like and unlike
        rating: {
          likes: 0,
          dislikes: 0
        },
        //Stores user input into stored input
        'post_title': $scope.userInput,
        //Stores user description into stored Body
        'post_description': $scope.userDescription, 
        //gets current date and stores into date
        'date': new Date() 
      });
        //Store the array into localStorage
        $localStorage.store = $scope.improvs; 
        //Refreshes the user input
        $scope.userInput = '';
        //Refreshes the user description 
        $scope.userDescription = ''; 
    }
  }

  /**
   * Called by the delete button 
   * and deletes from "localStorage" and from "improvs"
   */
  $scope.delete = function(index){
      $scope.improvs.splice(index, 1);
      $localStorage.store = $scope.improvs;
  }

  /**
   * runs when the like button  is pressed
   * and increases by 1 in "localstorage" and "improvs"
   */
  $scope.thumbsUp = function(input){
    //increments likes by one everytime thumbsUp button is clicked
    input.rating.likes += 1;
  }

  /**
   * runs when the dislike button is pressed
   * and increases by 1 in "localstorage" and "improvs"
   */
  $scope.thumbsDown = function(input){
    //increments dislikes by one everytime thumbsDown button is clicked
    input.rating.dislikes += 1;
  }
}]);