angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('AppCtrl', function($http,$scope, $ionicModal, $timeout,$state, $ionicPopup, $timeout, $ionicNavBarDelegate, $cordovaGeolocation,$window) {
  $("#menu_toogle").attr('class','button button-icon button-clear ion-navicon')

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
                  state.go("app.login")
                $http.get(getBaseURL()+"App/track_logout").success(function(data){
                  console.log(data)
                  if(data == "success"){

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
                       loader('off');
                        state.go("app.login")
                      
                       //$window.location.reload(); 
                  }
                })

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

 $scope.choice_interval = {};

 var checkNetConnection = function(){
     var xhr = new XMLHttpRequest();
     var file = "http://about.arcsystems.ph";
     var r = Math.round(Math.random() * 10000);
     xhr.open('HEAD', file + "?subins=" + r, false);
     try {
      xhr.send();
      if (xhr.status >= 200 && xhr.status < 304) {
        $("#submit_danger").hide();
       return true;
      } else {
        
        $("#submit_danger").show();
       return false;
      }
     } catch (e) {
     
        $("#submit_danger").show();
      return false;
     }
}
  //END OF DEPENDECIES



  var start_interval = function(){
      $time = $scope.choice_interval.select;
      $shit = $("#shit_here").val();
      $shit2 = $("#shit_here2").val();
      var amIOnline = checkNetConnection();
      $what_long = $("#what_long").val();
      $what_lat = $("#what_lat").val();

      setInterval(function(){
          var posOptions = {enableHighAccuracy: true};
           $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
              var lat  = position.coords.latitude
              var long = position.coords.longitude
              
              if($shit=="success" && $shit2=="" && lat != $what_lat && long != $what_long && amIOnline){
                  //console.log('start interval..'+$time+'');
                  insert_location(long,lat);
              }else{
                  console.log('stop interval..');
              }
           }, function(err) {
              console.log(err)
           });

      },$time)

  }


  var insert_location = function(long,lat){
      $("#what_long").val(long);
      $("#what_lat").val(lat);
      $token = localStorage.getItem("token");
      $token_name = localStorage.getItem("token_name");
      $arc_email = localStorage.getItem("arc_email");
      $arc_pass = localStorage.getItem("arc_pass");
      $arc_id = localStorage.getItem("arc_id");
     
      $.ajax({
        url: "http://track.arcsystems.ph/index.php/Tracks/process_tracks",
        type: "POST",
        data:{
          'action':'save',
          'longitude': long,
          'latitude': lat,
          'token': $token,
          'arc_id': $arc_id,
          'arc_email': $arc_email,
          'arc_pass': $arc_pass,
          'csrf_token_name':$token 
        },success:function(data){
          console.log(data);

          if(data == "success"){
              $("#shit_here").val(data); 
          }

          start_interval();

        },error:function(data){
          console.log(data.responseText)
        }
      })


  }



  $scope.start_submit = function(action){

      $time = $scope.choice_interval.select;
      if($time == undefined){
         $scope.showAlert('Arc Track','Please choose time interval!','');
      }else{

          switch(action){
            case "on":
            var amIOnline = checkNetConnection();
            
              if(!amIOnline){
                $scope.showAlert('Arc Track','<strong style="color:red;">You are currently Offline!</strong>','');
              }else{
                $("#time_list").attr('style','cursor:wait;pointer-events:none;opacity:0.6')
                $("#shit_here2").val('');
                $("#start_btn").attr('disabled',true);
                $("#stop_btn").attr('disabled',false);
                  var posOptions = {enableHighAccuracy: true};
                   $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                      var lat  = position.coords.latitude
                      var long = position.coords.longitude              
                      insert_location(long,lat,$time);
                   }, function(err) {
                      console.log(err)
                   });
              }

            break;

            case "off":
              loader('on');
              $("#time_list").removeAttr('style');
              $window.location.reload(); 
              $state.go($state.current, {}, {reload: true});
              $("#shit_here2").val('stop');
              $("#start_btn").attr('disabled',false);
              $("#stop_btn").attr('disabled',true);
            break;
          }

      }
   

        

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
  $token = localStorage.getItem("token");

  if($token!=""){
     $state.go('app.home'); 
  }

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
          url: "http://track.arcsystems.ph/index.php/App/validate_login",
          method: "POST",
          data:$.param($scope.loginData),
          headers:{'Content-Type':'application/x-www-form-urlencoded'}
        }).success(function(data){
            //console.log(data);
            loader('off')
           if(data == "error"){
             $scope.showAlert('Arc Track','<strong style="color:red;">Invalid Email/Password!</strong>');
           }else{
            $token_name = data.split("|")[0];
            $token_value = data.split("|")[1];
            $arc_id = data.split("|")[3];
            $email = data.split("|")[2];
            $pass = data.split("|")[4];

            localStorage.setItem("token", $token_value);
            localStorage.setItem("token_name", $token_name);
            localStorage.setItem("arc_id", $arc_id);
            localStorage.setItem("arc_email", $email);
            localStorage.setItem("arc_pass", $pass);
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

