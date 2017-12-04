function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
	$active_panel = $('.accordion.active').next();
	$active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
}