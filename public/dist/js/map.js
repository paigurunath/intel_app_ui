var latlongs = [];
var latitude = "";
var longitude = "";
navigator.geolocation.getCurrentPosition(function(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude + " " + longitude);
});

setInterval(function(){
	latitude = latitude + 0.001;
	longitude = longitude + 0.001;
	console.log(latitude + " " + longitude);
	TrackmapData(latitude,longitude);
},10000); 

function TrackmapData(lat,lng) {			
	var mylatlongs = new google.maps.LatLng(lat,lng);
	latlongs.push(mylatlongs);
		
	newlatlongsLength = latlongs.length;
	oldlatlongsLength = latlongs.length;


	var mapProp = {
		zoom: 20,
		center: latlongs[latlongs.length - 1],
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('google-map-div'), mapProp);

	var trackPath = new google.maps.Polyline({
		path: latlongs,
		icons: [{
			icon: {
				path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
			},
			repeat: '175px'
		}],
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	trackPath.setMap(map);
}