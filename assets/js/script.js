$(document).ready(function() {
    
// button functions are below 

    $(".rules").click(function(){
        $("#rules-box").toggle();
    })

    $("#game-a-button").click(function(){
        if($("#game-a-box").hasClass("hidden")){
        $("#game-a-box").removeClass("hidden");
        $("#game-b-box").addClass("hidden");
        } else {
            $("#game-a-box").addClass("hidden");
        }
    })

    $("#game-b-button").click(function(){
        if($("#game-b-box").hasClass("hidden")){
            $("#game-b-box").removeClass("hidden");
            $("#game-a-box").addClass("hidden");
            } else {
                $("#game-b-box").addClass("hidden");
            }
        
    })

    $("#combined-score-button").click(function(){
        $("#combined-scores").toggle();
    })




});