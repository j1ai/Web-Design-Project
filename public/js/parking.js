var cityList = [];
var foodList = [];
var buildList = [];
var map;
var demoCenter;
var favList = [];
var markers = [];
var uid = 1;
var cur_size = 0;
var buildstart = 1;
var allList = new Array(400);
for (i=0; i <400; i++){
    allList[i]=new Array(9);
}
var tempList = [];
var cur_marker;


var first = function createMarkers(){
	
	var promise = new Promise(function (resolve,reject) {

    $.ajax({
        type:'GET',
        url: 'http://127.0.0.1:3000/location/parking',
        success:function(data){
            $.each(data,function(i,item){
                allList[i][0] = item.title;
                allList[i][1] = item.lat;
                allList[i][2] = item.lng;
                
                if (item.address == ""){
                    allList[i][3] = "No address given";
                }
                else{
                    allList[i][3] = item.address;
                }
                allList[i][4] = item.description;
                allList[i][5] = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
                allList[i][7] = 'Parking';
                cur_size + i;
            })
        },
        error:function(jqXHR, textStatus, errorThrown){
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        }
    });

   $.ajax({
    type:'GET',
    url: '/location/food',
     success:function(data){
        $.each(data,function(i,item){
             allList[cur_size+i][0] = item.name;
             allList[cur_size+i][1] = item.lat;
             allList[cur_size+i][2] = item.lng;

            if (item.address == ""){
                 allList[cur_size+i][3] = "No address given";
            }
            else{
                allList[cur_size+i][3] = item.address;
            }
            allList[cur_size+i][4] = item.description;
            allList[cur_size+i][5] = 'https://www.boozeat.com/themes/demo/assets/images/common/icon-extras.png';
				allList[cur_size+i][7] = 'food';
            cur_size++;
            buildstart = cur_size;
        })
    },
    error:function(jqXHR, textStatus,  errorThrown){
        alert(jqXHR.responseText);
        alert(jqXHR.status);
        alert(jqXHR.readyState);
        alert(jqXHR.statusText);
        alert(textStatus);
        alert(errorThrown);
    		}
	});

    $.ajax({
    type:'GET',
    url: 'http://127.0.0.1:3000/location/building',
    success:function(data){
        $.each(data,function(i,item){
            allList[cur_size+i][0] = item.name;
            allList[cur_size+i][1] = item.lat;
            allList[cur_size+i][2] = item.lng;
            if (item.address == ""){
                allList[cur_size+i][3] = "No address given";
            }
            else{
                allList[cur_size+i][3] += item.address.street;
                allList[cur_size+i][3] += item.address.city;
					 allList[cur_size+i][3] += item.address.province;
					 allList[cur_size+i][3] += item.address.country;
                allList[cur_size+i][3] += item.address.postal;
            }
            allList[cur_size+i][4] = item.campus;
            allList[cur_size+i][5] = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
				allList[cur_size+i][7] = 'building';
				allList[cur_size+i][8] = item.code;
            cur_size++;
        })
    },
    error:function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.responseText);
        alert(jqXHR.status);
        alert(jqXHR.readyState);
        alert(jqXHR.statusText);
        alert(textStatus);
        alert(errorThrown);
    }
 });
	resolve("finsih")
 });
 	return promise;
};

function initialize(){
		first()
			.then(second)
			.then(
			setTimeout(third, 1500)
			);
}

var second = function init(){	
		var promise = new Promise(function (resolve,reject) {
		$(window).on('load', function () {
        demoCenter = new google.maps.LatLng(43.66333,-79.40032);
        map = new google.maps.Map(document.getElementById('map_canvas'), {
           zoom: 15,
           center: demoCenter,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         });
         
    	});
		resolve();			
	});
		
		return promise;
		
	}

var third = function makeMarkers() {
		 var promise = new Promise(function (resolve,reject) {	    				    
				    var marker, type,
				    i,
				    infowindow = new google.maps.InfoWindow();
					 
				
				    for (i = 0; i < allList.length; i++) 
				    {  
				        marker = new google.maps.Marker({
				            position: new google.maps.LatLng(allList[i][1], allList[i][2]),
				            map: map,
				            icon: allList[i][5],
				            title: allList[i][0],
				        });
						  
						  marker.id = uid;
				        uid ++;        
				        
				        google.maps.event.addListener(marker, 'click', (function(marker, i) {
				            return function() {
				
					        var content = '<div style="color:#071931" class="panel" id="everything'+ i +'">' +
					        '<dd>' + "<Strong>"+ allList[i][0]+ "</Strong>" + '</dd>' +
					        '<dd>' + "<Strong>Address: </Strong>" + allList[i][3] + '</dd>' +
					        '<dd>' + allList[i][4]+ '</dd>' + 
							  '<br /><input type = "button" value = "Delete" onclick = "DeleteMarker(' + marker.id + ');" value = "Delete" />' +        
					        +'</div>';
					
					        allList[i][6] = content;
					        map.setZoom(16);
					        map.setCenter(marker.getPosition());
					        
					        infowindow.setContent(content);
				        	  infowindow.open(map, marker);    
				        }
				           
				        })(marker, i));
				        
				        markers.push(marker);
				        if (allList[i][7] == 'Parking'){
								cityList.push(marker);     
				        }
				        else if (allList[i][7] == 'food'){
								foodList.push(marker);        
				        }
				        else if (allList[i][7] == 'building') {
				        		buildList.push(marker);
				    	  }
				        marker.setVisible(false); 
					}
					
			resolve();
				
	});
	return promise;
};
	
	
	 function cleanMap(){
	        demoCenter = new google.maps.LatLng(cityList[0][1],cityList[0][2]);
	        map = new google.maps.Map(document.getElementById('map_canvas'), {
	           zoom: 15,
	           center: demoCenter,
	           mapTypeId: google.maps.MapTypeId.ROADMAP
	         });
    }


	function SearchMap() {	
		var i;
		var code = document.getElementById("mySearch").value;
		for (i = buildstart+1; i < allList.length; i++){
			 if (allList[i][8] == code){
					marker = markers[i];
					marker.setVisible(true);
					map.setZoom(16);
					map.setCenter(marker.getPosition());
					tempList.push(marker);
					cur_marker = marker;
			 }
		}			
	}

	function DeleteMarker(id) {
        //Find and remove the marker from the Array
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].id == id) {
                //Remove the marker from Map                  
                markers[i].setMap(null);
 
                //Remove the marker from array.
                markers.splice(i, 1);
                return;
            }
        }
    }
    
    function addParkMarkers() {
    		var i;
    		for (i=0;i<cityList.length;i++){
				marker = cityList[i];
				marker.setVisible(true);    		
    		}
    		for (i=0;i<tempList.length;i++){
				marker = tempList[i];
				marker.setVisible(true);    		
    		}
    		map.setZoom(16);
			map.setCenter(cur_marker.getPosition());
    }
    
    function addFoodMarkers() {
    	  var i;
    	  for (i=0;i<foodList.length;i++){
				marker = foodList[i];
				marker.setVisible(true);    		
    		}
    		for (i=0;i<tempList.length;i++){
				marker = tempList[i];
				marker.setVisible(true);    		
    		}
    		map.setZoom(16);
			map.setCenter(cur_marker.getPosition());
    }
    
    function clearmarkers() {
		  var i;
    	  for (i=0;i<markers.length;i++){
				marker = markers[i];
				marker.setVisible(false);    		
    		}    
    }
    
    


$(document).on('click', '.add-park-markers', function(e) {
    e.preventDefault();
	 clearmarkers()
    addParkMarkers();
});


$(document).on('click', '.add-food-markers', function(e) {
    e.preventDefault();
    clearmarkers();
    addFoodMarkers();
});