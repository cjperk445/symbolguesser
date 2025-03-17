$(document).ready(function() {

    
});
    
/**
 * This Function is called upon to generate a random sum 
 * that is used for both games on the page
 */
function createSum() {

    // Creates two random numbers between 1 and 20
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
        
    // Chooses a random operator
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];

            
    // Calculate the answer

    let answer;
    
      if (operator === "+") {
          answer = num1 + num2;
      } else if (operator === "-")
        // if num1 is larger than num2 this swaps them around, thus avoiding a negative number.
    {if (num1 < num2) {
            [num1, num2] = [num2, num1];
            answer = num1 - num2;} else {
               answer = num1 - num2;
            }
      } else if (operator === "*" ) {
          answer = num1 * num2;
      }  else if (operator === "/")
        // this while loop checks to see if the numbers are wholly divisible, then iterates until they are.
        {while((num1 % num2)!==0){
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            answer = num1 / num2;
      } }  else {
          alert(`Unknown Operator: ${operator}`);
          //throw 
          //`Unknown Operator: ${operator}. Oh the humanity! Aborting!`;
      }
      
      // Place the numbers, operator and answer in the correct elements

      $("#operand1").text(num1);
      $("#operand2").text(num2);
      $("#operator").text(operator);
      $("#answer").text(answer);

       
    }


     $(".question-button").click(function(){
        $("#maths-sum").removeClass("hidden").css("display","flex");
        createSum();
    
    });

    // Button Jquery is below
   
    $("#game-a-button").click(function() {
            // Toggle visibility of game-a-box and game-b-box
            //this also changes the Active class
            if ($("#game-a-box").hasClass("hidden")) {
                $("#game-a-box").removeClass("hidden");
                $("#game-a-box").addClass("active");
                $("#game-b-box").addClass("hidden");
                $("#game-b-box").removeClass("active");
                //Changes the text in speech bubble
                $("#generic-text").addClass("hidden");
                $("#game-b-text").addClass("hidden");
                $("#game-a-text").removeClass("hidden");
                 // This is different for both games to hide the element required 
                $("#operator").addClass("secret");
                $("#answer").removeClass("secret");
                // adding this to the game button stops the user from cheating by flipping between games
                createSum();
            } else {
                $("#game-a-box").addClass("hidden");
                $("#game-a-box").removeClass("active");
                $("#generic-text").removeClass("hidden");
                $("#game-a-text").addClass("hidden");
                $("#game-b-text").addClass("hidden");
            }
        });
       

    $("#game-b-button").click(function(){
        if ($("#game-b-box").hasClass("hidden")) {
            $("#game-b-box").removeClass("hidden");
            $("#game-b-box").addClass("active");
            $("#game-a-box").addClass("hidden");
            $("#game-a-box").removeClass("active");
            //Changes the text in speech bubble
            $("#generic-text").addClass("hidden");
            $("#game-a-text").addClass("hidden");
            $("#game-b-text").removeClass("hidden");
            // This is different for both games to hide the element required 
            $("#operator").removeClass("secret");
            $("#answer").addClass("secret");
            // adding this to the game button stops the user from cheating by flipping between games
            createSum();
        } else {
            $("#game-b-box").addClass("hidden");
            $("#game-b-box").removeClass("active");
            $("#generic-text").removeClass("hidden");
            $("#game-b-text").addClass("hidden");
            $("#game-a-text").addClass("hidden");
        }});
        
        // this will hide and unhide the combined score and will recalculate the total scores each time pressed
    $("#combined-score-button").click(function(){
        if ($("#combined-scores-box").hasClass("hidden")) {
            $("#combined-scores-box").removeClass("hidden");
            $("#combined-scores-box").addClass("active");
            showTotalScores();
           // $("#combined-scores-box").css({display: "flex"});
        } else {
            $("#combined-scores-box").addClass("hidden");
            $("#combined-scores-box").removeClass("active");
            showTotalScores();} 
    });

    


    // Combined functionality of hiding a div and changing the original button text
    $(".rules").click(function(){
        if ($("#rules-box").hasClass("hidden")){
            $("#rules-box").removeClass("hidden");
            $(".rules").each(function(x){
                var replace_text = $(this).text().replace("Reveal", "Hide");
                $(this).text(replace_text);
            });
        }else{
            $("#rules-box").addClass("hidden");
            $(".rules").each(function(x){
                var replace_text = $(this).text().replace("Hide", "Reveal");
                $(this).text(replace_text);
            });
            }
        });
       
        // Add hover effect to all I elements within the class 'info-button'
        // On mouse enter, scale up the <i> element inside the button then
        // On mouse leave, reset the <i> element to its original size and ensure colors are correct
    $(".choice-button").on('mouseenter',function(){
        if($(this).hasClass("selected")){
        }else{
            $(this).css({
                transform: "scale(1.2)",
                backgroundColor: "var(--primary-color)",
                transition: "all 0.2s ease-in-out"})
            .find("i").css({
                transform: "scale(1.2)",
                color: "var(--highlight-color)",
                transition: "all 0.2s ease-in-out"   
            });
        }}).on('mouseleave', function(){
            if($(this).hasClass("selected")){
            }else{
            $(this).css({
                transform: "scale(1)",
                backgroundColor: "",
                transition: "all 0.2s ease-in-out"})
            .find("i").css({
                transform: "scale(1)",
                color: "",
                transition: "all 0.2s ease-in-out"   
            });
        }});
        
  

    $(".choice-button").click(function(){
        $(".choice-button").not(this).removeClass("selected").css({
            transform: "scale(1)",
            backgroundColor: "",
            color: "",
            transition: "all 0.2s ease-in-out"   
        }) .find("i").css({
            transform: "scale(1)",
            color: "",
            transition: "all 0.2s ease-in-out"})
        $(this).addClass("selected").children("i");
    })

    /**
     * Show's combined scores and incorrect answers to both games in one place
     */
  
    function showTotalScores() {

        //gather all the correct information and parse them into Integers

        let gameACorrect = parseInt(document.getElementById("game-a-score").innerText);
        let gameBCorrect = parseInt(document.getElementById("game-b-score").innerText);
        let totalCorrect = gameACorrect + gameBCorrect;

        let gameAIncorrect = parseInt(document.getElementById("game-a-incorrect").innerText);
        let gameBIncorrect = parseInt(document.getElementById("game-b-incorrect").innerText);
        let totalIncorrect = gameAIncorrect + gameBIncorrect;

        // then place them in the correct places in the page

        $("#combined-score").text(totalCorrect);
        $("#combined-incorrect").text(totalIncorrect);

        return {totalCorrect, totalIncorrect};



    }

    

  
    




