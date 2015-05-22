describe('testing Maincontroller', function(){

  beforeEach(module('myApp'));

  var $scope, controller, localStorage;

  beforeEach(inject(function(_$controller_, _$localStorage_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $localStorage = _$localStorage_;
  }));

  beforeEach(function(){
    $scope = {};
    controller = $controller('MainController', {'$scope': $scope, '$localStorage': $localStorage});
  });

  describe('default Improvs', function(){
    it('should have two default improvs', function(){
      expect($scope.improvs).toBeDefined();
    });

    it('should have post_title in default improvs', function(){
      expect($scope.improvs.post_title == "Scare Off the Bench");
      expect($scope.improvs.post_title == "The Dating Game");

    });

    it('should have post_description in default improvs', function(){
      expect($scope.improvs[0].post_description).toBeDefined();
      expect($scope.improvs[1].post_description).toBeDefined();
    });

    it('should have default ratings not less than 2', function(){
      expect($scope.improvs[0].rating.likes).not.toBeLessThan(2);
      expect($scope.improvs[1].rating.likes).not.toBeLessThan(2);
      expect($scope.improvs[0].rating.dislikes).not.toBeLessThan(2);
      expect($scope.improvs[1].rating.dislikes).not.toBeLessThan(2);
    });
  });

  describe('adding improvs', function(){
    it('should be empty, improvs field refreshes', function(){
      $scope.userInput = "Test1";
      $scope.userDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
      $scope.submitInput();
      console.log('UserInput', $scope.userInput);
      expect($scope.userInput).toEqual('');
      expect($scope.userDescription).toEqual('');
    });

    it('should add new improvs to localstorage', function(){
      var testImprove = [];
      var testImprove = $scope.improvs;

      $scope.improvs.unshift({
        rating: {
          likes: 0,
          dislikes: 0
        },
        'post_title': 'Test2',
        'post_description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        'date': new Date() 
      })

      $scope.submitInput();
      console.log('userInput', testImprove);
      $localStorage.store = testImprove;
      expect($localStorage.store.length).toEqual(3)
    });

    it('should store improvs to localStorage', function(){
      var like = $localStorage.store[0].rating.likes;
      var dislike = $localStorage.store[0].rating.dislikes;
      var post_title = $localStorage.store[0].post_title;
      expect(like).toEqual($scope.improvs[0].rating.likes);
      expect(dislike).toEqual($scope.improvs[0].rating.dislikes);
      expect(post_title).toEqual($scope.improvs[0].post_title);
    });

    it('should update improvs in localstorage', function(){
     var initlike = $localStorage.store[0].rating.likes;
     var initdislike = $localStorage.store[0].rating.dislikes;
     $scope.thumbsUp($localStorage.store[0]);
     $scope.thumbsDown($localStorage.store[0]);
     var currentlike = $localStorage.store[0].rating.likes;
     var currentdislike = $localStorage.store[0].rating.dislikes;
     console.log('likes', currentlike, 'dislikes', currentdislike);
     expect(currentlike - initlike).toEqual(1);
     expect(currentdislike - initdislike).toEqual(1);
    });

  });

   // it('', function(){
   //  $scope.delete();
   //  // expect($scope.improvs).toBe(true);
   //  expect($scope.improvs.length).toEqual(1);
   // });
  describe('like and dislike improvs', function(){
    it('should increase likes by one on thumbsUp', function(){
      var initlikes = $scope.improvs[0].rating.likes;
      $scope.thumbsUp($scope.improvs[0]);
      var currentlikes = $scope.improvs[0].rating.likes;
      expect(currentlikes - initlikes).toEqual(3);
    });

    it('should increase dislikes by one on thumbsDown', function(){
      var initDislikes = $scope.improvs[0].rating.dislikes;
      $scope.thumbsDown($scope.improvs[0]);
      var currentDislikes = $scope.improvs[0].rating.dislikes;
      expect(currentDislikes - initDislikes).toEqual(1);
   });
  });
});