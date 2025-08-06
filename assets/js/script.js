
/**
 * This Function is called upon to generate a random sum
 * that is used for both games on the page
 */
function createSum() {
  // Creates two random numbers between 1 and 20
  let num1 = Math.floor(Math.random() * 20) + 1;
  let num2 = Math.floor(Math.random() * 20) + 1;

  // Chooses a random operator
  let operators = ["+", "-", "*", "/"];
  let operator = operators[Math.floor(Math.random() * operators.length)];

  // Calculate the answer

  let answer;

  if (operator === "+") {
    answer = num1 + num2;
  } else if (operator === "-") {
    /** if num1 is larger than num2 this swaps them around,
     * thus avoiding a negative number.
     */
    if (num1 < num2) {
      [num1, num2] = [num2, num1];
      answer = num1 - num2;
    } else {
      answer = num1 - num2;
    }
  } else if (operator === "*") {
    answer = num1 * num2;
  } else if (operator === "/") {
    /** this while loop checks to see if the numbers are wholly divisible,
      *then iterates until they are.
      */
    while (num1 % num2 !== 0) {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 / num2;
    }
  } else {
    alert(`Unknown Operator: ${operator}`);
  }

  // Place the numbers, operator and answer in the correct elements

  $("#operand1").text(num1);
  $("#operand2").text(num2);
  $("#operator").text(operator);
  $("#answer").text(answer);
}


// Button Jquery is below

/**
* This eventhandler shows the question area and
* generates a new question each time it's pressed
* it also checks to see if either game is activated to
*ensure the correct element has the "secret" class
*/

$(".question-button").click(function () {
 $("#maths-sum").removeClass("hidden");
  createSum();
  if($("#game-a-box").hasClass("active")){
    $("#operator").addClass("secret");
  } else {
    $("#operator").removeClass("secret");
  }
  if($("#game-b-box").hasClass("active")){
    $("#answer").addClass("secret");
  } else {
    $("#answer").removeClass("secret");
  }
  $("#generic-robot").removeClass("hidden");
  $("#happy-robot").addClass("hidden");
  $("#sad-robot").addClass("hidden");
});


$("#game-a-button").click(function () {
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
   /** adding this to the game button stops the user
      * from cheating by flipping between games
      */
    createSum();
  } else {
    $("#game-a-box").addClass("hidden");
    $("#game-a-box").removeClass("active");
    $("#generic-text").removeClass("hidden");
    $("#game-a-text").addClass("hidden");
    $("#game-b-text").addClass("hidden");
    $("#maths-sum").addClass("hidden");
  }
});

$("#game-b-button").click(function () {
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
   /** adding this to the game button stops the user
      * from cheating by flipping between games
      */
    createSum();
  } else {
    $("#game-b-box").addClass("hidden");
    $("#game-b-box").removeClass("active");
    $("#generic-text").removeClass("hidden");
    $("#game-b-text").addClass("hidden");
    $("#game-a-text").addClass("hidden");
    $("#maths-sum").addClass("hidden");
  }
});

/** this will hide and unhide the combined score
* and will recalculate the total scores each time pressed
*/
$("#combined-score-button").click(function () {
  if ($("#combined-scores-box").hasClass("hidden")) {
    $("#combined-scores-box").removeClass("hidden");
    $("#combined-scores-box").addClass("active");
    showTotalScores();
  } else {
    $("#combined-scores-box").addClass("hidden");
    $("#combined-scores-box").removeClass("active");
    showTotalScores();
  }
});

// Combined functionality of hiding a div and changing the original button text
$(".rules").click(function () {
  if ($("#rules-box").hasClass("hidden")) {
    $("#rules-box").removeClass("hidden");
    $(".rules").each(function() {
      let replace_text = $(this).text().replace("Reveal", "Hide");
      $(this).text(replace_text);
    });
  } else {
    $("#rules-box").addClass("hidden");
    $(".rules").each(function() {
      let replace_text = $(this).text().replace("Hide", "Reveal");
      $(this).text(replace_text);
    });
  }
});

/** Add hover effect to all <i> elements within the class 'info-button'
* On mouse enter, scale up the <i> element inside the button then
* On mouse leave, reset the <i> element to its
* original size and ensure colors are correct
* on click of one of the four mathematical symbols
* it will ensure only that button is "selected"
* The button selected will also not react to the previous mouseenter
* and mouseleave event handlers
*/
$(".choice-button").click(function () {
  $(".choice-button")
    .not(this)
    .removeClass("selected")
    .css({
      backgroundColor: "",
      color: "",
      transform: "scale(1)",
      transition: "all 0.2s ease-in-out"
    })
    .find("i")
    .css({
      color: "",
      transform: "scale(1)",
      transition: "all 0.2s ease-in-out"
    });
  $(this).addClass("selected").children("i");
});

// let questionActive = document.getElementById("maths-sum").classList.contains("hidden");

// simple event handler to call up the function below
$("#game-a-submit").click(function () {
  if ($("#maths-sum").hasClass("hidden")) {
    alert("BRRRRP You need to press 'Gimme a Question' first!!!");
  } else {
    checkAnswerA();
  }
});


// simple event handler to call up the function below
$("#game-b-submit").click(function(){
  if($("#maths-sum").hasClass("hidden")){
    alert("Bleep Bloop - No question Generated! Press Gimme a Question ZZZT")
  } else {
    checkAnswerB();
}});


/** both the below event handlers allows the user
* to press return to sumbit their answers
* by running the exact same function there is
* no difference from pressing submit and return.
*/
$("#answer-box").on("keypress",function(e) {
    if(e.which === 13) {
        checkAnswerB();
    }
});

$(".choice-button").on("keypress",function(e){
    if(e.which === 13){
        checkAnswerA();
    }
});

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

  return { totalCorrect, totalIncorrect };
}

/**
 * Checks the answer given with the correct answer in game A,
 *  then increments the correct areas accordingly
 */
function checkAnswerA() {
/**  this uses Jquery to only target elements that have
* both the classes .choice-button and .selected
*/
    let chosenAnswerButton = $(".choice-button.selected");
    let correctAnswerA = document.getElementById("operator").innerText;

    /**
    * this makes sure that entering the submit
    * button with nothing selected doesn't work.
    */
    if (chosenAnswerButton.length === 0) {
        alert("Please select a symbol before submitting!");
        return; // Exit the function if no button is selected
    }

    /**
    * Get the ID of the selected button - with the way the CSS has been
    * written, only one button can ever have both .choice-button
    * and selected simultaneously.
    */
    let chosenAnswerA = chosenAnswerButton.attr("id");

    // Map button IDs to symbols
    if (chosenAnswerA === "addChosen"){
        chosenAnswerA = "+";
    } else if (chosenAnswerA === "minusChosen"){
        chosenAnswerA = "-";
    } else if (chosenAnswerA === "timesChosen"){
        chosenAnswerA = "*";
    } else if (chosenAnswerA === "divideChosen"){
        chosenAnswerA = "/";
    }

    // Compare the user's choice with the correct answer
    if (correctAnswerA === chosenAnswerA) {
        alert(`Wow! Ding Ding Ding yes, the correct symbol is ${correctAnswerA}`);
        incrementScoreA();
        createSum();
        $("#generic-robot").addClass("hidden");
        $("#sad-robot").addClass("hidden");
        $("#happy-robot").removeClass("hidden");
        } else {
        alert(`Womp womp, the correct answer was ${correctAnswerA}`);
        incrementWrongA();
        createSum();
        $("#generic-robot").addClass("hidden");
        $("#happy-robot").addClass("hidden");
        $("#sad-robot").removeClass("hidden");
    }
}

/**
 * Checks the answer given with the correct answer in game B,
 *  then increments the correct areas accordingly
 */

function checkAnswerB(){

    // Fetches the answer the user submitted and the correct answer
    let userAnswerB = parseInt(document.getElementById("answer-box").value);
    let correctAnswer = parseInt(document.getElementById("answer").innerText);
    let isCorrect = userAnswerB === correctAnswer;
    let isBlank = Number.isNaN(userAnswerB);

    // simple boolean result
    if(isCorrect){
        alert("Correctamundo zzzt you truly are a Whizz!");
        incrementScoreB();
        document.getElementById("answer-box").value = "";
        createSum();
        $("#generic-robot").addClass("hidden");
        $("#sad-robot").addClass("hidden");
        $("#happy-robot").removeClass("hidden");
    } else if(isBlank) {
        alert("BLEEP BLEEP BLEEP! You didn't put in an answer! please try again!");
        document.getElementById("answer-box").value = "";
        createSum();
        $("#generic-robot").addClass("hidden");
        $("#happy-robot").addClass("hidden");
        $("#sad-robot").removeClass("hidden");
    } else {
        alert(`Does not compute! Your answer ${userAnswerB} is not correct, the correct answer was ${correctAnswer} please do try again zzzt`);
        incrementWrongB();
        document.getElementById("answer-box").value = "";
        createSum();
        $("#generic-robot").addClass("hidden");
        $("#happy-robot").addClass("hidden");
        $("#sad-robot").removeClass("hidden");
    }

}

/**
 * If correct answer is given to Game A, this will increase the total score by 1
 */

function incrementScoreA(){
    let oldScoreA = parseInt(document.getElementById("game-a-score").innerText);
    document.getElementById("game-a-score").innerText = ++oldScoreA;

}

/**
 * If correct answer is given to Game B, this will increase the total score by 1
 */

function incrementScoreB(){

    let oldScoreB = parseInt(document.getElementById("game-b-score").innerText);
    document.getElementById("game-b-score").innerText = ++oldScoreB;

}

/**
 * If incorrect answer is given to Game A, this will increase the total incorrect tally by 1
 */

function incrementWrongA(){

    let oldScoreA = parseInt(document.getElementById("game-a-incorrect").innerText);
    document.getElementById("game-a-incorrect").innerText = ++oldScoreA;

}

/**
 * If incorrect answer is given to Game B, this will
 *increase the total incorrect tally by 1
 */

function incrementWrongB(){

    let oldScoreB = parseInt(document.getElementById("game-b-incorrect").innerText);
    document.getElementById("game-b-incorrect").innerText = ++oldScoreB;


}