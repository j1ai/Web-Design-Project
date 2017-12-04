function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
	$active_panel = $('.accordion.active').next();
	$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
}

function publish_message(){
	
	var pub_reason = $('#pub_reason').val();
	var pub_message = $('#pub_message').val();
	post_body = {"message": pub_message,
			"reason": pub_reason}
	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:3000/api/messages/",
		data: JSON.stringify(post_body),
		contentType: "application/json",
		dataType: "json",
	});
}

function hide_del_show_pub(){
	$('#publish_message_div').show();
	$('#delete_message_div').hide();
	$active_panel = $('.accordion.active').next();
    $active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
}

var sys_message_template = `
<tr id = sys_msg_id666>
<td class = 'table_del_time'>creat_date666</td>
<td class = 'table_del_reason'>reason666</td>
<td class = 'table_del_message'>message666</td>
<td><input  type="radio" name= "del_message_radio" id = sys_msg_id667></input></td>
</tr>
`
function hide_pub_show_del(){
	$('#delete_message_div').show();
	$('#publish_message_div').hide();
	$('#delete_message_list').empty();
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
				$('#delete_message_list').append(sys_message_html);
			}
			$active_panel = $('.accordion.active').next();
    		$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
		}
	});

}

function msg_del(){
	if ($('input:radio:checked').length == 0 ){
		alert('You need to select at least one message to delete.');
	}
	else if ($('input:radio:checked').length == 1){
		var del_msg_id = $('input:radio:checked')[0].id;
		$.ajax({
			type: "DELETE",
			url: "http://127.0.0.1:3000/api/messages/"+del_msg_id,
			success: function(result) {
        	alert('The message has been deleted');
        	hide_pub_show_del();
    }
		});
	}
}



