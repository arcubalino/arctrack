angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state, $ionicPopup, $timeout, $ionicNavBarDelegate, $cordovaGeolocation) {

  var current_position = function(){

   // var watchOptions = {timeout : 3000, enableHighAccuracy: false};
   // var watch = $cordovaGeolocation.watchPosition(watchOptions);
  
   // watch.then(
   //    null,
    
   //    function(err) {
   //       console.log(err)
   //    },
    
   //    function(position) {
   //       var lat  = position.coords.latitude
   //       var long = position.coords.longitude
   //       console.log(lat + '' + long)
   //    }
   // );
  }

  //DEPENDENCIES:  
    $ionicNavBarDelegate.showBackButton(false);
    if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
        $scope.out_list = false;
        $scope.in_list = true;
        $scope.token_check = true;
    }else{

        $scope.token_check = false;
        $scope.in_list = false;
        $scope.out_list = true;
    }

 // A confirm dialog
 $scope.showConfirm = function(title,msg,action) {
   var confirmPopup = $ionicPopup.confirm({
     title: title,
     template: msg
   });

   confirmPopup.then(function(res) {
      if(res){

          switch(action){
            case "logout":
                loader('on');
                localStorage.setItem("token", "");
                localStorage.setItem("token_name", "");
                  if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
                      $scope.out_list = false;
                      $scope.token_check = true;
                      $scope.in_list = true;
                  }else{
                      $scope.in_list = false;
                      $scope.token_check = false;
                      $scope.out_list = true;
                  }
                $state.go("app.login")
                 loader('off');

            break;
          }
      }

   });
 };

 // An alert dialog
 $scope.showAlert = function(title,msg,action) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: '<center>'+msg+'</center>'
   });

   alertPopup.then(function(res) {
     
      switch(action){

      }

   });
 }; 
  //END OF DEPENDECIES

  var insert_location = function(long,lat){
    
  }

  $scope.start_submit = function(){
         
      setInterval(function(){
          var posOptions = {enableHighAccuracy: true};
           $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
              var lat  = position.coords.latitude
              var long = position.coords.longitude
              console.log(lat + '   ' + long)
           }, function(err) {
              console.log(err)
           });

      },2000)
        

  }


  $scope.logout = function(){
    
           $scope.showConfirm('Confirm Logout','Are you sure to logout?','logout')
  } 

  $scope.system_menu = function(){
     if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== ""){
          $scope.out_list = false;
          $scope.in_list = true;
          $scope.token_check = true;
      }else{
          $scope.token_check = false;
          $scope.in_list = false;
          $scope.out_list = true;
      }
  }

})


.controller('LoginCtrl', function($scope, $stateParams,$state, $ionicSideMenuDelegate,$http, $ionicPopup, $timeout) {
  $ionicSideMenuDelegate.canDragContent(false)
  loader('off');
  $scope.loginData = {};


  $scope.validate_login = function(){

      $email = $("#email_here").val();
      $password = $("#password_here").val();
      $validate = validate_email($email);

       if($email == ""){
          $msg = "Please enter email address!";
          $return = false;
       }else if(!$validate){
          $msg = "Please enter a valid email!";
          $return = false;
       }else if($password == ""){
          $msg = "Please enter your password!";
          $return = false;
       }else{
        $return = true;
       }

       if(!$return){

          $scope.showAlert('Arc Track',"<strong style='color:red;'>"+$msg+"</strong>");
       }

  }

  $scope.validate = function(){

      $scope.validate_login();

       if($return){
        loader('on');
        
        $scope.loginData.from = "mobile";  
        $http({
          url: "http://localhost/arctrack/App/validate_login",
          method: "POST",
          data:$.param($scope.loginData),
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(data){

            loader('off')
           if(data == "error"){
             $scope.showAlert('Arc Track','<strong style="color:red;">Invalid Email/Password!</strong>');
           }else{
            $token_name = data.split("|")[0];
            $token_value = data.split("|")[1];

            localStorage.setItem("token", $token_value);
            localStorage.setItem("token_name", $token_name);
             $state.go('app.home'); 
           }
          
        }).error(function(data){
          console.log(data)
        });
          

       }
       
  
  }

});



    
  // // An elaborate, custom popup
  // var myPopup = $ionicPopup.show({
  //   template: '<input type="password" ng-model="data.wifi">',
  //   title: 'Enter Wi-Fi Password',
  //   subTitle: 'Please use normal things',
  //   scope: $scope,
  //   buttons: [
  //     { text: 'Cancel' },
  //     {
  //       text: '<b>Save</b>',
  //       type: 'button-positive',
  //       onTap: function(e) {
  //         if (!$scope.data.wifi) {
  //           //don't allow the user to close unless he enters wifi password
  //           e.preventDefault();
  //         } else {
  //           return $scope.data.wifi;
  //         }
  //       }
  //     }
  //   ]
  // });

  // myPopup.then(function(res) {
  //   console.log('Tapped!', res);
  // });

  // $timeout(function() {
  //    myPopup.close(); //close the popup after 3 seconds for some reason
  // }, 3000);

