
function getFood(){
    $.ajax({
        type:'GET',
        url: 'http://127.0.0.1:3000/dataset/food.json',
        success:function(data){
            // similar to enumerate in python
            $('.foodBracket').empty();
            $.each(data,function(i,item){
                if (item.campus == "UTSG"){
                    $(".foodBracket").append('<div class="foodcontainer" id="foodblock'+ i + '">')
                    $("#foodblock" + i).append('<div class="foodaccordion">'
                        + item.name + '<img src="' + item.image + '" width=100%>' + '</div>')
                    $("#foodblock" + i).append('<div class="foodpanel" id="food'+ i +'">')

                    $("#food"+i).append('<p>' + '<Strong>Associated Building: <a href = "http://map.utoronto.ca/building/' + item.building_id + '">'+ item.address + '</a>' + '</p>')
                    $("#food" + i).append('<h3>Hours</h3>')
                    $("#food" + i).append('<table class="access_table'+i+'">')
                    $(".access_table"+i)
                    .append('<thead>' +
                        '<tr>' + '<th>Sun</th>' +
                        '<th>Mon</th>' + '<th>Tue</th>' +
                        '<th>Wed</th>' + '<th>Thu</th>' +
                        '<th>Fri</th>' + '<th>Sat</th>' +
                        '</tr>' + '</thread>')


                    $(".access_table"+i).append('<tbody>' + '<tr id="tr'+i+'">' +
                        '</tr>' + '</tbody>')
                    $.each(item.hours, function(j, day){
                            if (day.closed) {
                                $("#tr"+i).append('<td>close</td>')
                            } else {
                                $("#tr"+i).append('<td>'+(day.open/3600)+
                                    ' am - <br>' + ((day.close/3600)-12)+' pm</td>')
                            }
                        })

                    $("#food"+ i).append("</table>")
                    // $("#food"+i).append('<p>'+ item.description + '</p>')
                    $("#foodblock"+i).append('</div>')
                    $(".foodBracket").append('</div>')
                }

            })
        },
        error:function(jqXHR, textStatus, errorThrown){
        }
    });
}

