var favourite_template =`
<li class="items">
       <div class="infoWrap"> 
        
        <div class="cartSection">

          <h3>fav_course_code666</h3>
        
        </div>  
    
        
        <div class="prodTotal cartSection">
          <p>fav_course_desc666</p>
        </div>
              <div class="cartSection removeWrap">
        </div>
      </div>
</li>`

function show_favourite(){
  $.ajax({
    type: "GET",
    url: window.location.protocol+'//'+ $.grep([ window.location.hostname,window.location.port], Boolean).join(":") + "/favorites_course/getFavoriteCourse/",
    contentType: "application/json",
    dataType: "json",
    success:function(res){
      // message_list = JSON.stringify(res.data);
      message_list = res;
      for (id in message_list){
        cur_fav_course = message_list[id];
        course_code = JSON.stringify(cur_fav_course['course_code'])||'';
        course_desc = JSON.stringify(cur_fav_course['course_desc'])||'';
        favourite = favourite_template.replace('fav_course_code666', course_code.substring(1,7))
                             .replace('fav_course_desc666', course_desc);
        $('#list_to_append').append(favourite);
      }
      $active_panel = $('.accordion.active').next();
      $active_panel.css('max-height', $active_panel.prop("scrollHeight") + "px");
    },
    error:function(){
      alert('Please log in first');
    }
  });
}

// Remove Items From Cart
$('a.remove_from_fav').click(function(){
  event.preventDefault();
  $( this ).closest('li').hide();
 
})
