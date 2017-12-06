function addFavourite(course_id){
    $('#'+course_id+'.fav_button_class').toggleClass('active');
    var course_code = $('#'+course_id+'.fav_button_class').closest('#detail-info-1').find('.course_code')[0].innerText
	var course_desc = $('#'+course_id+'.fav_button_class').closest('#detail-info-1').find('#course_detail')[0].innerText

	var post_body = {
		"course_code": course_code,
		"course_name":"",
		"course_desc":course_desc}
	$.ajax({
		type: "POST",
		url: window.location.protocol+'//'+ $.grep([ window.location.hostname,window.location.port], Boolean).join(":") + "/favorites_course/saveFavoriteCourse/",
		data: JSON.stringify(post_body),
		contentType: "application/json",
		dataType: "json",
	});
}