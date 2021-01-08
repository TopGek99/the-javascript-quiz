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
        questionq: "How do you write \"Hello World\" in an alert box?", 
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
function startQuiz() {
    document.getElementById("home").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
}
function showQuestion() {
    var qDiv = document.getElementById("question");
    var ans = document.getElementsByClassName("answers");
    qDiv.innerText= questionList[qNum].question;
    for (var i=0;i<ans.length;i++) {
        ans[i].innerText = questionList[qNum].ansList[i];
    }
    qNum++;
}
document.getElementById("start").addEventListener("click",startQuiz);
var quizButtons = document.getElementsByClassName("pbtn");
for (var i=0;i<quizButtons.length;i++) {
    quizButtons[i].addEventListener("click",showQuestion);
}