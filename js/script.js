// initialising variables that contain (most of) the elements in the HTML file
var hsLink = document.getElementById("high-score-link");
var timeDiv = document.getElementById("time");
var homeDiv = document.getElementById("home");
var quizDiv = document.getElementById("quiz");
var endDiv = document.getElementById("endgame");
var hsDiv = document.getElementById("high-scores");
var startButton = document.getElementById("start");
var questionH1 = document.getElementById("question");
var ansButtons = document.getElementsByClassName("answers");
var scoreSpan = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var scoreList = document.getElementById("score-list");
var goBackButton = document.getElementById("go-back");
var clearButton = document.getElementById("clear");

// initialsing array of question objects, containing a question string, an array of strings for the possible answers, and an integer representing the index of the correct answer
var questionList = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        ansList: ["<javascript>","<scripting>","<js>","<script>"], 
        correct: 3
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        ansList: ["The <head> section","Both the <head> section and the <body> section are correct","The <body> section","In it's own div tag"],
        correct: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        ansList: ["<script name=\"xxx.js\">","<script href=\"xxx.js\">","<script src=\"xxx.js\">","<script link=\"xxx.js\">"],
        correct: 2
    },
    {
        question: "How do you write \"Hello World\" in an alert box?", 
        ansList: ["msg(\"Hello World\");","alert(\"Hello World\");","msgBox(\"Hello World\");","alertBox(\"Hello World\");"], 
        correct: 1
    },
    {
        question: "How do you create a function in JavaScript?", 
        ansList: ["function:myFunction()","function = myFunction()","function myFunction()","myFunction()"], 
        correct: 2
    },
    {
        question: "How do you call a function named \"myFunction\"?", 
        ansList: ["call function myFunction()", "myFunction()","call myFunction()","run myFunction()"], 
        correct: 1
    },
    {
        question: "How to write an IF statement in JavaScript?", 
        ansList: ["if (i == 5)","if i = 5 then","if i == 5 then","if i = 5"], 
        correct: 0
    },
    {
        question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5", 
        ansList: ["if i <> 5","if i =! 5 then","if (i != 5)","if (i <> 5)"], 
        correct: 2},
    {
        question: "How does a WHILE loop start?", 
        ansList: ["while (i <= 10)", "while (i <= 10; i++)", "while i = 1 to 10", "there is no WHILE loop, only FOR loops"], 
        correct: 0
    }
];

// declaring global variables: qNum representing which of the nine questions is active, with the other two being fairly self-explanatory
var qNum = 0;
var timer, interval;
var scoreArray = [];

// startQuiz function called when the start button, sets a timer for 90 seconds for the duration of the quiz, removes the home screen from sight and shows the questions
function startQuiz() {
    timer = 91;
    timeDiv.textContent = "Time: "+--timer;
    interval = setInterval(function() {
        timeDiv.textContent = "Time: "+--timer;
        // smaller interval used to determine (seemingly) instantaneously if the timer has been brought below zero by an incorrectness penalty (-15s)
        var smallInterval = setInterval(function() {
            if (timer < 0) {
                timer = 0;
                endQuiz();
                clearInterval(smallInterval);
            }
        }, 1);
    }, 1000);
    homeDiv.style.display = "none";
    quizDiv.style.display = "block";
    // note: the parameter for showQuestion here is arbitrary as it is only used if a question has just been answered
    showQuestion(0);
}

// showQuestion function holds most of the logic for the quiz 
function showQuestion(index) {
    // line 94-118 dedicated to showing the user if they are correct or incorrect
    var response, colour;
    if (qNum !== 0 && index == questionList[qNum-1].correct) {
        response = "Correct!";
        colour = "green";
        score++;
    } else if (qNum !== 0) {
        response = "Incorrect!";
        colour = "red";
        // incorrect answer results in 15s penalty
        timer -= 15;
    }
    var hr = document.createElement("hr");
    var responseText = document.createElement("p");
    responseText.textContent = response;
    hr.style.color = colour;
    responseText.style.color = colour;
    responseText.style.fontWeight = 900;
    if (qNum != 0) {
        quizDiv.appendChild(hr);
        quizDiv.appendChild(responseText);
    }
    setTimeout(function() {
        hr.style.display = "none";
        responseText.style.display = "none";
    }, 1000);
    // if the question number tracker has reached the end of the list, the quiz ends, if not it populates the page with the next question/answers and iterates the tracker
    if (qNum === questionList.length) {
        endQuiz();
    } else {
        questionH1.innerText = questionList[qNum].question;
        for (var i=0;i<ansButtons.length;i++) {
            ansButtons[i].innerText = questionList[qNum].ansList[i];
        }
        qNum++;
    }
}

// endQuiz function simply removes the question portion of the webpage and shows the "end game" page with the users score, and resets the question number tracker for the next attempt
function endQuiz() {
    timeDiv.textContent = "Time: "+timer;
    scoreSpan.innerText = timer+".";
    quizDiv.style.display = "none";
    endDiv.style.display = "block";
    qNum = 0;
    clearInterval(interval);
}

// function to remove the high scores list
function clearScores() {
    while (scoreList.hasChildNodes()) {  
        scoreList.removeChild(scoreList.firstChild);
    }
}

startButton.addEventListener("click",startQuiz);

// Could clearly use a loop here but for some reason does not seem to work when I do and I can't for the life of me figure out why, but this works so I'm keeping it
ansButtons[0].addEventListener("click",function() { showQuestion(0) });
ansButtons[1].addEventListener("click",function() { showQuestion(1) });
ansButtons[2].addEventListener("click",function() { showQuestion(2) });
ansButtons[3].addEventListener("click",function() { showQuestion(3) });

// if the "View Highscores" link is clicked it hides whatever is showing and shows the high scores list
hsLink.addEventListener("click",function(event) {
    event.preventDefault();
    homeDiv.style.display = "none";
    endDiv.style.display = "none";
    hsLink.style.display = "none";
    timeDiv.style.display = "none";
    quizDiv.style.display = "none";
    hsDiv.style.display = "block";
});

// when submit button is clicked players score is added to the high score list, and shows the high scores page
submitButton.addEventListener("click",function() {
    endDiv.style.display = "none";
    hsLink.style.display = "none";
    timeDiv.style.display = "none";
    hsDiv.style.display = "block";
    if (scoreArray.length === 0) {
        scoreArray.push({
            initials: initialsInput.value,
            score: timer
        });
    } else {
        for (var i=0;i<scoreArray.length;i++) {
            if (timer > scoreArray[i].score) {
                scoreArray.splice(i,0,{
                    initials: initialsInput.value,
                    score: timer
                });
                break;
            }
        }
    }
    clearScores();
    for (var i=0;i<scoreArray.length;i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = scoreArray[i].initials + " - " + scoreArray[i].score;
        scoreList.appendChild(scoreItem);
        if ((i % 2) === 0) {
            scoreItem.style.backgroundColor = "lavender";
        }
    }
});

// go back button simply resets to home page
goBackButton.addEventListener("click",function() {
    hsDiv.style.display = "none";
    hsLink.style.display = "block";
    timeDiv.textContent = "Time: 0";
    timeDiv.style.display = "block";
    homeDiv.style.display = "block";
});

clearButton.addEventListener("click", clearScores);