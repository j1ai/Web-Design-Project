var cityList = new Array(10000);
            for (i=0; i <10000; i++){
                cityList[i]=new Array(5);
            }
            var map;
            var demoCenter;
    function createMarkers(){
            $.ajax({
                type:'GET',
                url: 'http://127.0.0.1:3000/dataset/parking.json',
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

    function initialize()
            {
                createMarkers(); 
                 $(window).on('load', function () {
                demoCenter = new google.maps.LatLng(cityList[0][1],cityList[0][2]);
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: demoCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
                 });

            }


            function addMarkers()
            {
                var marker, 
                i,
                infowindow = new google.maps.InfoWindow();
                

                for (i = 0; i < cityList.length; i++) 
                {  
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(cityList[i][1], cityList[i][2]),
                        map: map,
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

            $(document).ready(function() {
                initialize();
            });

            $(document).on('click', '.add-markers', function(e) {
                e.preventDefault();
                addMarkers();
            });