        var cityList = new Array(10000);
            for (i=0; i <10000; i++){
                cityList[i]=new Array(6);
            }
            var map;
            var demoCenter;
            function createMarkers(){
            $.ajax({
                type:'GET',
                url: 'http://127.0.0.1:3000/dataset/buildings.json',
                success:function(data){
                    $.each(data,function(i,item){
                        cityList[i][0] = item.name;
                        cityList[i][1] = item.lat;
                        cityList[i][2] = item.lng;
                        if (item.address == ""){
                            cityList[i][3] = "No address given";
                        }
                        else{
                            cityList[i][3] = [item.address.street,item.address.city,item.address.postal];
                        }
                        cityList[i][4] = item.campus;
                        cityList[i][5] = item.code;
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
                            var content = '<div class="panel" id="parking'+ i +'">' +
                    '<dd>' + "<Strong>"+ cityList[i][0]+ "</Strong>" + '</dd>' +
                    '<p>' + "<Strong>Address: </Strong>" + '<br />' +"Street:" +cityList[i][3][0] +
                    '<br />' +"City:" +cityList[i][3][1]+ 
                    '<br />' +"Postal Code:" +cityList[i][3][2]+'</p>' +
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

            function SearchMap() {
                var code = document.getElementById("mySearch").value;

                var marker, 
                i,
                infowindow = new google.maps.InfoWindow();
                
                demoCenter = new google.maps.LatLng(cityList[0][1],cityList[0][2]);
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 15,
                   center: demoCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                for (i = 0; i < cityList.length; i++) 
                {  
                    if (cityList[i][5] == code){

                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(cityList[i][1], cityList[i][2]),
                            map: map,
                            title: cityList[i][0]
                        });

                        

                        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                            return function() {
                                var content = '<div class="panel" id="parking'+ i +'">' +
                        '<dd>' + "<Strong>"+ cityList[i][0]+ "</Strong>" + '</dd>' +
                        '<p>' + "<Strong>Address: </Strong>" + '<br />' +"Street:" +cityList[i][3][0] +
                        '<br />' +"City:" +cityList[i][3][1]+ 
                        '<br />' +"Postal Code:" +cityList[i][3][2]+'</p>' +
                        '<dd>' + cityList[i][4]+ '</dd>' + '</div>';
                                infowindow.setContent(content);
                                infowindow.open(map, marker);
                            }
                        })(marker, i));
                    }
                }
            }