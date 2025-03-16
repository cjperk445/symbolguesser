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

    //combine random numbers with the randomly chosen operator

    let finalSum = `${num1} ${operator} ${num2}`;
        
    // Calculate the answer

    let answer;
    
      if (operator === "+") {
          answer = num1 + num2;
      } else if (operator === "-") {
          answer = num1 - num2;
      } else if (operator === "*" ) {
          answer = num1 * num2;
      }  else if (operator === "/"){
	      answer = num1 / num2;
      }   else {
          alert(`Unknown Operator: ${operator}`);
          throw `Unknown Operator: ${operator}. Oh the humanity! Aborting!`;
      }
    
        return { question, answer };
}
   

    // Revealing button functions are below 
   
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
        $("#combined-scores-box").toggle();
        $("#combined-scores-box").css({display: flex});
    })

    $(".rules").click(function(){
        $("#rules-box").toggle();
    })

    




