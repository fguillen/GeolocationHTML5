console.log("Geolocalize me! v0.0.3");var SimpleGeoApp={};SimpleGeoApp.get_location=function(){console.log("get_location()"),Modernizr.geolocation?(SimpleGeoApp.set_status("geolocalizing"),navigator.geolocation.getCurrentPosition(SimpleGeoApp.geolocation_sucess,SimpleGeoApp.geolocation_error,SimpleGeoApp.get_position_options())):(console.log("No geolocation support"),SimpleGeoApp.set_status("no_supported"),alert("Soory, your browser has not geolocation support"))},SimpleGeoApp.get_position_options=function(){console.log("get_position_options()");var a=$("#high_accuracy_option").is(":checked"),b=$("#timeout_option").val(),c=$("#maximum_age_option").val(),d={};return d.enableHighAccuracy=a,isNaN(parseInt(b))||(d.timeout=parseInt(b)),isNaN(parseInt(c))||(d.maximumAge=parseInt(c)),console.log("position_options",d),d},SimpleGeoApp.geolocation_sucess=function(a){console.log("show_location()",a),SimpleGeoApp.set_status("success"),$("#latitude_field").val(a.coords.latitude),$("#longitude_field").val(a.coords.longitude),$("#accuracy_field").val(a.coords.accuracy),$("#altitude_field").val(a.coords.altitude),$("#altitude_accuracy_field").val(a.coords.altitudeAccuracy),$("#heading_field").val(a.coords.heading),$("#speed_field").val(a.coords.speed),$("#timestamp_field").val(new Date(a.timestamp).toString()),SimpleGeoApp.show_in_map(a.coords.latitude,a.coords.longitude),$("#google_api_key_field").val().length>0&&SimpleGeoApp.get_address($("#google_api_key_field").val(),a.coords.latitude,a.coords.longitude)},SimpleGeoApp.geolocation_error=function(a){console.log("geolocation_error()",a),SimpleGeoApp.set_status("error"),$("#error_code_field").val(a.code),$("#error_message_field").val(a.message)},SimpleGeoApp.set_status=function(a){console.log("set_status()",a),SimpleGeoApp.status=a,$("#status_field").val(SimpleGeoApp.status),$(".status_component").css("display","none"),$(".status_component_"+SimpleGeoApp.status).css("display","inline"),"geolocalizing"==SimpleGeoApp.status?$("#request_permission_text").show():$("#request_permission_text").hide()},SimpleGeoApp.show_in_map=function(a,b){console.log("show_in_map()",a,b);{var c=new google.maps.LatLng(a,b),d={zoom:15,center:c},e=new google.maps.Map(document.getElementById("map_canvas"),d);new google.maps.Marker({position:c,map:e,title:"Marker"})}},SimpleGeoApp.get_address=function(a,b,c){console.log("get_address()",a,b,c),$.ajax({type:"GET",dataType:"json",url:"https://maps.googleapis.com/maps/api/geocode/json?latlng="+b+","+c+"&key="+a,data:{},success:function(a){console.log("get_address(): success",a);var b=JSON.stringify(a,null,2);$("#address_field").html(b)},error:function(){console.log("get_address(): error")}})},SimpleGeoApp.set_status("stand_by"),$("#geolocalize_me_form").on("submit",function(a){SimpleGeoApp.get_location(),a.preventDefault()});