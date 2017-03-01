$( document ).ready(function() {

    var cmd = Mousetrap(document.querySelector('#cmd'));

    Mousetrap.bind('j', next);

});


function next(){
    $.get("/image",{ mount: "Masters"  }, function(data){
	$("figure>#pic").attr("src", data.filename);
    });
}


