
$(document).ready(function (){
    $(".dropDown").hide();
    $(".search-section").keyup(function(e) {

        var searchText = $(".search-section").val();

        if (e.which == 13) {
            //alert(searchText);
            if(searchText != "") {
                toSubmit(searchText);
            }
        }
        if(searchText == "") {
            hideAll();

        }

        else if(e.which) {    
            $.ajax({ 
                type: "POST",
                url: "https://en.wikipedia.org/w/api.php?action=opensearch&list=presearch&search=" + searchText + "&prop=info&inprop=url&utf8=&format=json",
                dataType: "jsonp",
                success: function(response) {

                    $(".keyStrokeOutput").empty();
                    for(var i=0; i<5; i++) {
                        $(".keyStrokeOutput").append('<a href="'+response[3][i]+'"><li><u><i>'+response[1][i]+"</u></i> : "+response[2][i]+'</li></a>');
                        if(response[1][i] == null){
                            break;
                        }
                    }
                    $(".dropDown").show();
                    $(".mainFunc").css("background", "white");
                    $(".mainFunc").css("border", "solid");
                    $(".mainFunc").css("border-color", "grey");
                    $(".mainFunc").css("border-width", "1px");

                }                
            });
        }
    });
});
   

function toSubmit(searchText){
    $.ajax({
        type: "POST",
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&list=presearch&search=" + searchText + "&prop=info&inprop=url&utf8=&format=json",
        dataType: "jsonp",
        success: function (response) {
            //console.log(response);
            window.location.href = response[3][0];
        },
        error: function (x) {
            console.log(x);
        }
    })

}

$(function() {
    $('#btn1').click(function() {
        var searchText = $(".search-section").val();
        toSubmit(searchText);
    });
});


$(function() {
    $('#btn2').click(function() {

        var searchText;
        $.ajax({
            type: "GET",
            url: "http://randomword.setgetgo.com/get.php?len=5",
            dataType: "jsonp",
            jsonpCallback: function(data) {
                console.log(data.Word);
            }
        });

        $.ajax({
            type: "POST",
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&list=presearch&search=" + searchText + "&prop=info&inprop=url&utf8=&format=json",
            dataType: "jsonp",
            success: function(response) {
                //window.location.href = response[3][0];
            },
            error: function (x) {
                console.log(x);
            }
        })
    });
}); 

$(function() {

    $(window).on('load', function(){
        $(".search-section").val("");
    });
});

$(document).click(function(e) {
    if (e.target.id != '.mainFunc' && $(e.target).parents('.mainFunc').length == 0) {
        hideAll();
    }
});

function hideAll() {
    $(".dropDown").hide();
    $(".mainFunc").css("background", "none");
    $(".mainFunc").css("border", "none");
}
