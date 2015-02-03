console.log("Geolocalize me! v0.0.1");

var SimpleGeoApp = {};

SimpleGeoApp.get_location = function(){
  console.log("get_location()");

  if(Modernizr.geolocation) {
    SimpleGeoApp.set_status("geolocalizing");

    navigator.geolocation.getCurrentPosition(
      SimpleGeoApp.geolocation_sucess,
      SimpleGeoApp.geolocation_error,
      SimpleGeoApp.get_position_options()
    );
  } else {
    console.log("No geolocation support");
    SimpleGeoApp.set_status("no_supported");
    alert("Soory, your browser has not geolocation support");
  }
}

SimpleGeoApp.get_position_options = function(){
  console.log("get_position_options()");

  var high_accuracy = $("#high_accuracy_option").is(':checked');
  var timeout = $("#timeout_option").val();
  var maximum_age = $("#maximum_age_option").val();

  var result = {}
  result["enableHighAccuracy"] = high_accuracy;
  if(!isNaN(parseInt(timeout))) result["timeout"] = parseInt(timeout);
  if(!isNaN(parseInt(maximum_age))) result["maximumAge"] = parseInt(maximum_age);

  console.log("position_options", result);

  return result;
}

SimpleGeoApp.geolocation_sucess = function(position){
  console.log("show_location()", position);
  SimpleGeoApp.set_status("success");

  $("#latitude_field").val(position.coords.latitude);
  $("#longitude_field").val(position.coords.longitude);
  $("#accuracy_field").val(position.coords.accuracy);
  $("#altitude_field").val(position.coords.altitude);
  $("#altitude_accuracy_field").val(position.coords.altitudeAccuracy);
  $("#heading_field").val(position.coords.heading);
  $("#speed_field").val(position.coords.speed);

  $("#timestamp_field").val(new Date(position.timestamp).toString());
}

SimpleGeoApp.geolocation_error = function(position_error){
  console.log("geolocation_error()", position_error);
  SimpleGeoApp.set_status("error");

  $("#error_code_field").val(position_error.code);
  $("#error_message_field").val(position_error.message);
}

SimpleGeoApp.set_status = function(status){
  console.log("set_status()", status)

  SimpleGeoApp.status = status;
  $("#status_field").val(SimpleGeoApp.status);

  $(".status_component").css("display","none");
  $(".status_component_" + SimpleGeoApp.status).css("display","inline");
}


SimpleGeoApp.set_status("stand_by");
$("#geolocalize_me_form").on("submit", SimpleGeoApp.get_location);