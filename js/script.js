// initialising variables that contain (most of) the elements in the HTML file
var hsLink = document.getElementById("high-score-link");
var timeDiv = document.getElementById("timer");
var homeDiv = document.getElementById("home");
var quizDiv = document.getElementById("quiz");
var endDiv = document.getElementById("endgame");
var hsDiv = document.getElementById("high-scores");
var purpleButtons = document.getElementsByClassName("pbtn");
var startButton = document.getElementById("start");
var questionH1 = document.getElementById("question");
var ansButtons = document.getElementsByClassName("answers");
var scoreSpan = document.getElementById("score");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var scoreList = document.getElementById("score-list");
var goBackButton = document.getElementById("go-back");
var clearButton = document.getElementById("clear");

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
var qNum = 0;
var timer;
var interval;
function startQuiz() {
    timer = 91;
    timeDiv.textContent = "Time: "+--timer;
    interval = setInterval(function() {
        timeDiv.textContent = "Time: "+--timer;
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
}
var response, colour; 
function showQuestion(index) {
    if (qNum !== 0 && index == questionList[qNum-1].correct) {
        response = "Correct!";
        colour = "green";
        score++;
    } else if (qNum !== 0) {
        response = "Incorrect!";
        colour = "red";
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

function endQuiz() {
    timeDiv.textContent = "Time: "+timer;
    scoreSpan.innerText = timer+".";
    quizDiv.style.display = "none";
    endDiv.style.display = "block";
    qNum = 0;
    clearInterval(interval);
}

startButton.addEventListener("click",startQuiz);
purpleButtons[0].addEventListener("click",function() { showQuestion(0) });
purpleButtons[1].addEventListener("click",function() { showQuestion(0) });
purpleButtons[2].addEventListener("click",function() { showQuestion(1) });
purpleButtons[3].addEventListener("click",function() { showQuestion(2) });
purpleButtons[4].addEventListener("click",function() { showQuestion(3) });

hsLink.addEventListener("click",function(event) {
    event.preventDefault();
    homeDiv.style.display = "none";
    endDiv.style.display = "none";
    hsLink.style.display = "none";
    timeDiv.style.display = "none";
    quizDiv.style.display = "none";
    hsDiv.style.display = "block";
});


submitButton.addEventListener("click",function() {
    endDiv.style.display = "none";
    hsLink.style.display = "none";
    timeDiv.style.display = "none";
    hsDiv.style.display = "block";
    var scoreItem = document.createElement("li");
    scoreItem.textContent = initialsInput.value + " - " + timer;
    scoreList.appendChild(scoreItem);
    if ((document.getElementsByTagName("li").length % 2) !== 0) {
        scoreItem.style.backgroundColor = "lavender";
    }
});

goBackButton.addEventListener("click",function() {
    hsDiv.style.display = "none";
    hsLink.style.display = "block";
    timeDiv.textContent = "Time: 0";
    timeDiv.style.display = "block";
    homeDiv.style.display = "block";
});


clearButton.addEventListener("click", function() {
    while (scoreList.hasChildNodes()) {  
        scoreList.removeChild(scoreList.firstChild);
    }
});