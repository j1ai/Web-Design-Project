function ajaxGetCourse(){
    $.ajax({
                    type:'GET',
                    url: 'https://jsonplaceholder.typicode.com/users',
                    success:function(data){
                        // similar to enumerate in python
                        $.each(data,function(i,item){
                            $('<li>')
                            .text(item.name)
                            .appendTo('.modify')
                        })
                    }
                });
}