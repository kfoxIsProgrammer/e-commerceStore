
//Global variable for the Array of items


$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
});

	
    
function item(itemnumber){
        $.ajax({
            //the url to send the data to
            url: "/item",
            //the data to send to
            data: {'id' : itemnumber},
            //type. for eg: GET, POST
            type: "POST",
            //datatype expected to get in reply form server
            dataType: "json",
            //on success
            success: function(data){
                //do something after something is recieved from php
                console.log('done');
            },
            //on error
            error: function(){
                //bad request
                console.log('fail');
            }
        });
    }



