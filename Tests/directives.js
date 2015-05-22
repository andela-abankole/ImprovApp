// describe('Testing directives', function(){
//   var scope, compile, rootScope;
//   beforeEach(module('myApp'));

//   beforeEach(inject(function(_$compile_, _$rootScope_){
//     $compile = _$compile_;
//     $rootScope = _$rootScope_;
//   }));

//   it('Replaces the element with the appropriate content', function(){
//     var element = $compile("<div><userinput></userinput></div>")($rootScope);
//     $rootScope.$digest();

//     expect(element.html()).toContain("")
//   });

//   it('Replaces the element with the appropriate content', function(){
//     var element = $compile("<div><search></search></div>")($rootScope);
//     $rootScope.$digest();

//     expect(element.html()).toContain("")
//   });
// });