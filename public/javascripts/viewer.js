folder = 'Masters';
$( document ).ready(function() {

    var cmd = Mousetrap(document.querySelector('#cmd'));

    Mousetrap.bind('j', next);

});


function next(){
    $.get("/image",{ mount: folder  }, function(data){
	$("figure>#pic").attr("src", data.filename);
    });
}


