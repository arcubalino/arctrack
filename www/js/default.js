function validate_email(email){
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
  return regex.test(email)

}

function date_conversion(xdate){
    var datex = new Date(xdate);
    $month = (datex.getMonth() + 1);
    $day =  datex.getDate();
    if($month < 10){
      $pre = 0;
    }else{
      $pre = "";
    }

    if($day < 10){
      $post = 0;
    }else{
      $post = "";
    }

    return ''+datex.getFullYear()+'-'+$pre+''+$month+'-'+$post+''+$day+'';
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function field_trap(target,action) {
  switch(action){

    case "clear":
      $(target).removeAttr('style');
    break;

    case "empty":

      $(target).val('');
    break;

    case "notice":
      $(target).css({'outline':'none','border-color':'red','box-shadow':'0 0 10px red'});
    break;

  }
}
function date_current(action){
  var currentTime = new Date();
  
  switch(action){
    case "year":
       // returns the year (four digits)
      $datex = currentTime.getFullYear();
    break;

    case "month":
       // returns the month (from 0 to 12)
      $datex = currentTime.getMonth() + 1;
    break;

    case "day":
      // returns the day of the month (from 1 to 31)
      $datex = currentTime.getDate();
    break;

    case "all":
      $month = currentTime.getMonth() + 1;
      $datex = ""+currentTime.getFullYear()+"/"+$month+"/"+currentTime.getDate()+"";
    break;

  }  

 
  return $datex;
}

function addStylePath(path){        
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = getBaseURL()+path;
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link); 
}

function addScriptPath(path){
    var scr=document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = getBaseURL()+path;
    document.getElementsByTagName('head')[0].appendChild(scr);  
}

function externalScriptPath(path){
    var scr=document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = path;
    document.getElementsByTagName('head')[0].appendChild(scr);  
}

function getBaseURL() {
    var origin = window.location.origin+'/';
    var pathArray = window.location.pathname.split( '/' );
    var base_url = '';
    base_url = origin+pathArray[1];

    return "http://localhost/arctrack/"
    //return base_url+'/';
}

function getURIstring(){
    var pathArray = window.location.pathname.split( '/' ),
        uri = '';
    pathArray.splice(0,2);
    if( pathArray.length > 0 ){
        uri = pathArray.join('/');
    }
    return uri;
}

function getFolder( pathname ){
    switch( pathname ){
        case 'base': id = 1; break;
        case 'sub': id = 3; break;
        default: id = 2; break;
    }

    // check if error
    var error = ( (id == 2 && pathname != 'main') && pathname == '' ) ? true:false;
    if( error )
        return false;
    // end check error

    var origin = window.location.origin+'/';
    var pathArray = window.location.pathname.split( '/' );
    
    return pathArray[id];
}



function decimalonly(e, decimal) {
var key;
var keychar;

if (window.event) {
   key = window.event.keyCode;
}
else if (e) {
   key = e.which;
}
else {
   return true;
}
keychar = String.fromCharCode(key);

if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
   return true;
}
else if ((("0123456789.").indexOf(keychar) > -1)) {
   return true;
}
else if (decimal && (keychar == ".")) { 
  return true;
}
else
   return false;
}


function loader(action){
  switch(action){
    case "on":
      $(".pre_blocker").show();
    break;
    case "off":
      $(".pre_blocker").hide();
    break;
  }
}




function letra(e, decimal) {

var key;
var keychar;

if (window.event) {
   key = window.event.keyCode;
}
else if (e) {
   key = e.which;
}
else {
   return true;
}
keychar = String.fromCharCode(key);

if ((key==null) || (key==0) || (key==8) ||  (key==9) || (key==13) || (key==27) ) {
   return true;
}
else if ((("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz").indexOf(keychar) > -1)) {
   return true;
}
else if (decimal && (keychar == ".")) { 
  return true;
}
else
   return false;
}