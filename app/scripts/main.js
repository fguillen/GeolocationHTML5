console.log("Geolocalize me! v0.0.3");

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

  SimpleGeoApp.show_in_map(position.coords.latitude, position.coords.longitude);

  if($("#google_api_key_field").val().length > 0) {
    SimpleGeoApp.get_address(
      $("#google_api_key_field").val(),
      position.coords.latitude,
      position.coords.longitude
    )
  }
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

SimpleGeoApp.show_in_map = function(latitude, longitude){
  console.log("show_in_map()", latitude, longitude);

  var myLatlng = new google.maps.LatLng(latitude, longitude);

  var mapOptions =
    {
      zoom: 15,
      center: myLatlng
    }

  var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  var marker =
    new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: "Marker"
    });
}

SimpleGeoApp.get_address = function(api_key, latitude, longitude){
  console.log("get_address()", api_key, latitude, longitude);

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + api_key,
    data: {},
    success: function(data) {
      console.log('get_address(): success', data);
      var data_formatted = JSON.stringify(data,null,2);
      $('#address_field').html(data_formatted);
    },
    error: function () {
      console.log('get_address(): error');
    }
});
}


SimpleGeoApp.set_status("stand_by");
$("#geolocalize_me_form").on("submit", function(event){
  SimpleGeoApp.get_location();
  event.preventDefault();
});
