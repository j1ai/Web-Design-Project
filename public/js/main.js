//meida only
$(window).on('load resize',
	function() {
		/* the viewport is less than 500 pixels wide */
		$('.tobe-accordion').addClass('accordion');
		$('.tobe-accordion').prop("click", null);
		$('.tobe-accordion').off('click');
		var $acc = $(".tobe-accordion");
		var i;
		$acc.each(
			function() {
				$(this).click(function() {
					$('#detail-info-2').empty();
					$('.foodBracket').empty();
					$('.accordion.active').next().css('max-height', "0px");
					$('.accordion.active').removeClass("active");
					$(this).toggleClass("active");
					var $panel = $(this).next();
					if ($panel.css('max-height') != '0px') {
						$panel.css('max-height', '0px');
					} else {
						$panel.css('max-height', $panel.prop("scrollHeight") + "px");
						if ($(this)[0].id == 'button-3' ) {
							getFood();
						}
						else if ($(this)[0].id == 'button-0' ){
							getHistoryMsg();
						}
					}
				});
			});
	}
);
var sys_message_template = `
<tr id = sys_msg_id666>
<td class = 'table_del_time'>creat_date666</td>
<td class = 'table_del_reason'>reason666</td>
<td class = 'table_del_message'>message666</td>
<td><input id= sys_msg_id667 name="to_be_del" type="radio"></td>
</tr>
`
function getHistoryMsg(){
	$.ajax({
		type: "GET",
		url: "http://127.0.0.1:3000/api/messages/",
		contentType: "application/json",
		dataType: "json",
		success:function(res){
			// message_list = JSON.stringify(res.data);
			message_list = res.data;
			for (id in message_list){
				cur_sys_message = message_list[id];
				sys_message_html = sys_message_template.replace('creat_date666', JSON.stringify(cur_sys_message['creat_data'].substring(4,21)))
													   .replace('sys_msg_id666', JSON.stringify(cur_sys_message['_id']))
													   .replace('sys_msg_id667', JSON.stringify(cur_sys_message['_id']))
													   .replace('reason666', JSON.stringify(cur_sys_message['reason']))
													   .replace('message666', JSON.stringify(cur_sys_message['message']));
				$('#history_message').append(sys_message_html);
			}
			$active_panel = $('.accordion.active').next();
    		$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
		}
	});
}
function getIdx(data, course_code) {
	for (var x in data) {
		if (data[x]['courses'][0]['code'] == course_code) return x;
	}
	return "Not Found";
}

function getCourseIdx(data, course_code) {
	for (var x in data) {
		if (data[x]['code'] == course_code) return x;
	}
	return "Not Found";
}


var textbook_template =`
<div style="float:left;">
	<img class = "course_info" style="padding: 5px; float:left;" id = "course_img" src=src666 alt="textbook-img" width="100" height="130">
	<div class="list">
  		<div href="#" id="fav_button">Add to Favorites</a>
	</div>
	<div id = "detail-info-2" style="padding: 25px; float:right; width:250px;" >
	<h4 class = "course_info" id = "course_id" style="vertical-align: top; width:230px; background-color: #526178; color:#11233E;border: 20px 100px 100px 100px; ">textbook_course_code666</h4>
	<h5 class = "course_info" id = "course_detail" style="width:230px; word-wrap: break-word; text-align: left; color:#526178; border: 100px 100px 100px 100px;"><b>Title: </b>textbook_title666</h5>
	<h4></h4>
	</div>
</div>
<h4></h4>
<hr align="center" style="height:5px; width: 400px; border:none;  color:#FFFFFF; background-color:#354C71;">
`

$("#search-textbook").on('click', function(e){
    
    var textbook_search_q = $('#search-input-2')[0].value;

    $('#search-result-div-2').empty();
    $('#detail-info-2').empty();
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/textbook/'+textbook_search_q,
        dataType: 'json',
        success:function(data){
            for (cid in data){
                textbook_data = data[cid];
                cur_textbook_html = textbook_template.replace('src666', textbook_data['image'])
                                  .replace('textbook_course_code666', textbook_data['code'])
                                  .replace('textbook_title666', textbook_data['title'])
                                  .replace(/^course_|,666$/, "N/A");
                $('#search-result-div-2').append(cur_textbook_html);
                $active_panel = $('.accordion.active').next();
                $active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
                
            }
        }
    }
        );
});

var course_template = `
<div id = "detail-info-1" style="float:left; width:100%" data_course_id = course_name666 >

<h4 class = "course_info" id = "course_id" style="vertical-align: top; background-color: #526178; color:#11233E;border: 100px 100px 100px 100px; ">course_id666</h4>
<h4 style = "width:50px float:left" class = "course_code" >course_code666</h4>
<div style = "width:50px float:right" class="list">
  <div href="#" id=course_id667  class = "fav_button_class" onclick = "addFavourite(this.id)">Add to Favorites <i class="fa fa-heart" aria-hidden="true"></i></a>
</div>
<h5 class = "course_info" id = "course_detail" style="color:#526178; text-align: left; border: 100px 100px 100px 100px;">Description: course_desc666</h5>
<h4></h4>
</div>
`
$("#search-course").on('click', function(e){
    
    var course_search_q = $('#search-input-1')[0].value;

    old_course_code = '';
    $('#search-result-div-1').empty();
    $('#detail-info-1').empty();
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3000/courses/'+course_search_q,
        dataType: 'json',
        success:function(data){
            for (cid in data){
                course_data = data[cid];
                cur_course_code = course_data['code'].substring(0, 6);
                if (cur_course_code!= old_course_code){
                    cur_course_html = course_template.replace('course_code666', course_data['code'])
                                      .replace('course_name666', course_data['name'])
                                      .replace('course_id666', course_data['id'])
                                      .replace('course_id667', course_data['id'])
                                      .replace('course_desc666', course_data['description'])
                                      .replace(/^course_|,666$/, "N/A");
                    $('#search-result-div-1').append(cur_course_html);
                    $active_panel = $('.accordion.active').next();
                    $active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
                    old_course_code = cur_course_code;
                }
                
            }
        }
    }
        );
});

function getFood() {
	$.ajax({
		type: 'GET',
		url: 'http://127.0.0.1:3000/location/food',
		success: function(data) {
			// similar to enumerate in python
			$('.foodBracket').empty();
			$.each(data, function(i, item) {
				if (item.campus == "UTSG") {
					$(".foodBracket").append('<div class="foodcontainer" id="foodblock' + i + '">')
					if (item.image == "") {
						$("#foodblock" + i).append('<div class="foodaccordion">' +
							item.name + '<img src="https://www.iowaagribusinessradionetwork.com/wp-content/uploads/2017/05/sb10066792a-001.jpg" width=100%>' + '</div>')
					} else {
						$("#foodblock" + i).append('<div class="foodaccordion">' +
							item.name + '<img src="' + item.image + '" width=100%>' + '</div>')
					}
					$("#foodblock" + i).append('<div class="foodpanel" id="food' + i + '">')
					$("#food" + i).append('<p>' + '<Strong>Associated Building: <a href = "http://map.utoronto.ca/building/' + item.building_id + '">' + item.address + '</a>' + '</p>')
					$("#food" + i).append('<h3>Hours</h3>')
					$("#food" + i).append('<table class="access_table' + i + '">')
					$(".access_table" + i)
						.append('<thead>' +
							'<tr>' + '<th>Sun</th>' +
							'<th>Mon</th>' + '<th>Tue</th>' +
							'<th>Wed</th>' + '<th>Thu</th>' +
							'<th>Fri</th>' + '<th>Sat</th>' +
							'</tr>' + '</thread>')
					$(".access_table" + i).append('<tbody>' + '<tr id="tr' + i + '">' +
						'</tr>' + '</tbody>')
					$.each(item.hours, function(j, day) {
						if (day.closed) {
							$("#tr" + i).append('<td>close</td>')
						} else {
							$("#tr" + i).append('<td>' + (day.open / 3600) +
								' am - <br>' + ((day.close / 3600) - 12) + ' pm</td>')
						}
					})
					$("#food" + i).append("</table>")
					// $("#food"+i).append('<p>'+ item.description + '</p>')
					$("#foodblock" + i).append('</div>')
					$(".foodBracket").append('</div>')
					$active_panel = $('.accordion.active').next();
					$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
				}
			})
		},
		error: function(jqXHR, textStatus, errorThrown) {}
	});
}
