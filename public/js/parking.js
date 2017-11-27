var cityList = new Array(101);
for (i=0; i <10000; i++){
    cityList[i]=new Array(6);
}
var foodList = new Array(101);
for (i=0; i <10000; i++){
    foodList[i]=new Array(6);
}
var buildList = new Array(101);
for (i=0; i <10000; i++){
    buildList[i]=new Array(6);
}
var map;
var demoCenter;

function createMarkers(){
    $.ajax({
        type:'GET',
        url: 'http://127.0.0.1:3000/location/parking',
        success:function(data){
            $.each(data,function(i,item){
                cityList[i][0] = item.title;
                cityList[i][1] = item.lat;
                cityList[i][2] = item.lng;
                if (item.address == ""){
                    cityList[i][3] = "No address given";
                }
                else{
                    cityList[i][3] = item.address;
                }
                cityList[i][4] = item.description;
                cityList[i][5] = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
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
            foodList[i][0] = item.name;
            foodList[i][1] = item.lat;
            foodList[i][2] = item.lng;
            if (item.address == ""){
                foodList[i][3] = "No address given";
            }
            else{
                foodList[i][3] = item.address;
            }
            foodList[i][4] = item.description;
            foodList[i][5] = 'https://www.boozeat.com/themes/demo/assets/images/common/icon-extras.png';
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
    url: 'http://127.0.0.1:3000/location/building',
    success:function(data){
        $.each(data,function(i,item){
            buildList[i][0] = item.name;
            buildList[i][1] = item.lat;
            buildList[i][2] = item.lng;
            if (item.address == ""){
                buildList[i][3] = "No address given";
            }
            else{
                buildList[i][3] = [item.address.street,item.address.city,item.address.postal];
            }
            buildList[i][4] = item.campus;
            buildList[i][5] = item.code;
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
}

function initialize(){
    createMarkers()
    $(window).on('load', function () {
        demoCenter = new google.maps.LatLng(43.66333,-79.40032);
        map = new google.maps.Map(document.getElementById('map_canvas'), {
           zoom: 15,
           center: demoCenter,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         });
    });
}


function addParkMarkers(){
    var marker, type,
    i,
    infowindow = new google.maps.InfoWindow();


    for (i = 0; i < cityList.length; i++) 
    {  
        
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(cityList[i][1], cityList[i][2]),
            map: map,
            icon: cityList[i][5],
            title: cityList[i][0]
        });

        

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var content = '<div style="color:#071931" class="panel" id="parking'+ i +'">' +
        '<dd>' + "<Strong>"+ cityList[i][0]+ "</Strong>" + '</dd>' +
        '<dd>' + "<Strong>Address: </Strong>" + cityList[i][3] + '</dd>' +
        '<dd>' + cityList[i][4]+ '</dd>' + '</div>';
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}


function addFoodMarkers(){
    var marker, type,
    i,
    infowindow = new google.maps.InfoWindow();


    for (i = 0; i < foodList.length; i++) 
    {  
        
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(foodList[i][1], foodList[i][2]),
            map: map,
            icon: foodList[i][5],
            title: foodList[i][0]
        });

        

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var content = '<div style="color:#071931" class="panel" id="food'+ i +'">' +
        '<dd>' + "<Strong>"+ foodList[i][0]+ "</Strong>" + '</dd>' +
        '<dd>' + "<Strong>Address: </Strong>" + foodList[i][3] + '</dd>' +
        '<dd>' + foodList[i][4]+ '</dd>' + '</div>';
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

    function cleanMap(){
        demoCenter = new google.maps.LatLng(cityList[0][1],cityList[0][2]);
        map = new google.maps.Map(document.getElementById('map_canvas'), {
           zoom: 15,
           center: demoCenter,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         });
    }

    function SearchMap() {
        var code = document.getElementById("mySearch").value;
        cleanMap();
        var infowindow = new google.maps.InfoWindow();

        for (i = 0; i < buildList.length; i++) 
        {  
            if (buildList[i][5] == code){

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(buildList[i][1], buildList[i][2]),
                    map: map,
                    title: cityList[i][0],
                    demoCenter = new google.maps.LatLng(buildList[i][1],buildList[i][2]),
                    zoom = 17
                });

                

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        var content = '<div class="panel" style="color:black" id="parking'+ i +'">' +
                '<dd>' + "<Strong>"+ buildList[i][0]+ "</Strong>" + '</dd>' +
                '<p>' + "<Strong>Address: </Strong>" + '<br />' +"Street:" +buildList[i][3][0] +
                '<br />' +"City:" +buildList[i][3][1]+ 
                '<br />' +"Postal Code:" +buildList[i][3][2]+'</p>' +
                '<dd>' + buildList[i][4]+ '</dd>' + '</div>';
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
}


$(document).on('click', '.add-park-markers', function(e) {
    e.preventDefault();
    cleanMap();
    addParkMarkers();
});


$(document).on('click', '.add-food-markers', function(e) {
    e.preventDefault();
    cleanMap();
    addFoodMarkers();
});