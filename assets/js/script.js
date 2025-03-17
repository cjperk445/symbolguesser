$(document).ready(function() {

    
});
    
/**
 * This Functoni is called upon to generate a random sum 
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
      } else if (operator === "-") {
        if (num1 < num2) {
            [num1, num2] = [num2, num1];
            answer = num1 - num2;} else {
               answer = num1 - num2;
            }
      } else if (operator === "*" ) {
          answer = num1 * num2;
      }  else if (operator === "/"){
        while((num1 % num2)!==0){
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


    function subtractionQuestion(operand1, operand2){
        operand1 > operand2 ? operand1 : operand2;
        operand1 > operand2 ? operand2 : operand1;
        operand1 - operand2;
    }

    function divisionQuestion(operand1, operand2){
        
    }


    $(".question-button").click(function(){
        $("#maths-sum").removeClass("hidden").css("display","flex");
        createSum();
        


    })

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
                $("#game-b-text").addClass("hidden")
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
        })
       

    $("#game-b-button").click(function(){
        if ($("#game-b-box").hasClass("hidden")) {
            $("#game-b-box").removeClass("hidden");
            $("#game-b-box").addClass("active");
            $("#game-a-box").addClass("hidden");
            $("#game-a-box").removeClass("active");
            //Changes the text in speech bubble
            $("#generic-text").addClass("hidden");
            $("#game-a-text").addClass("hidden")
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
        }})
        

    $("#combined-score-button").click(function(){
        $("#combined-scores-box").toggle();
        $("#combined-scores-box").css({display: flex});
        
       
    })

    // Combined functionality of hiding a div and changing the original button text
    $(".rules").click(function(){
        if ($("#rules-box").hasClass("hidden")){
            $("#rules-box").removeClass("hidden");
            $(".rules").each(function(x){
                var replace_text = $(this).text().replace("Reveal", "Hide");
                $(this).text(replace_text);
            })
        }else{
            $("#rules-box").addClass("hidden");
            $(".rules").each(function(x){
                var replace_text = $(this).text().replace("Hide", "Reveal");
                $(this).text(replace_text);
            })
            }
        })
       
  
    

  
    




