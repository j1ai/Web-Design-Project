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
					$('.accordion.active').next().css('max-height', "0px");
					$('.accordion.active').removeClass("active");
					$(this).toggleClass("active");
					var $panel = $(this).next();
					if ($panel.css('max-height') != '0px') {
						$panel.css('max-height', '0px');
					} else {
						$panel.css('max-height', $panel.prop("scrollHeight") + "px");
						if ($(this)[0].id == 'button-3') {
							getFood();
						}
					}
				});
			});
	}
);

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
$("#search-textbook").on('click', function(e) {
	$.ajax({
			type: 'GET',
			url: 'http://127.0.0.1:3000/site/textbook',
			dataType: 'json',
			success: function(data) {
				var textbook_data = data;
				var course_code = $('#search-input-2')[0].value;
				var idx = getIdx(textbook_data, course_code);
				//                    "ENG418H1F"
				//Append textbook data to div
				var isbn = textbook_data[idx]['isbn'];
				var image = textbook_data[idx]['image'];
				var title = textbook_data[idx]['title'];
				var bookstore_url = textbook_data[idx]['url'];
				$('#search-result-div-2').empty();
				$('#image-info-2').empty();
				$('#detail-info-2').empty();
				$('#search-result-div-2').append('<img class = "course_info" id = "course_img" src="' + image + '" alt="textbook-img" width="100" height="130"  >');
				$('#search-result-div-2').append('<div id = "detail-info-2" style="float:right;" ></div>');
				$('#detail-info-2').append('<h4 class = "course_info" id = "course_id" style="vertical-align: top; background-color: #526178; color:#11233E;border: 100px 100px 100px 100px; ">' + course_code + '</h4>');
				$('#detail-info-2').append('<h5 class = "course_info" id = "course_detail" style="  text-align: left; color:#526178; border: 100px 100px 100px 100px;">' + '<b>Title: </b>' + title + '</h5>');
				$('#search-result-div-2').append('<h4></h4>');
				$active_panel = $('.accordion.active').next();
				$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
			}
		})
		.catch(err => {
			console.log(err);
			alert('Failure of getting data');
		})
});
$("#search-course").on('click', function(e) {
	$.ajax({
			type: 'GET',
			url: 'http://127.0.0.1:3000/site/course',
			dataType: 'json',
			success: function(data) {
				var textbook_data = data;
				var course_code = $('#search-input-1')[0].value;
				var idx = getCourseIdx(textbook_data, course_code);
				//                    ""ANT370H5F""
				//Append textbook data to div
				var name = textbook_data[idx]['name'];
				var description = textbook_data[idx]['description'];
				$('#search-result-div-1').empty();
				$('#detail-info-1').empty();
				$('#search-result-div-1').append('<div id = "detail-info-1" style="float:right;" ></div>');
				$('#detail-info-1').append('<h4 class = "course_info" id = "course_id" style="vertical-align: top; background-color: #526178; color:#11233E;border: 100px 100px 100px 100px; ">' + name + '</h4>');
				$('#detail-info-1').append('<h5 class = "course_info" id = "course_detail" style="  color:#526178; text-align: left; border: 100px 100px 100px 100px;">' + '<b>Description: </b>' + description + '</h5>');
				$('#search-result-div-1').append('<h4></h4>');
				$active_panel = $('.accordion.active').next();
				$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
			}
		})
		.catch(err => {
			console.log(err);
			alert('Failure of getting data');
		})
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
