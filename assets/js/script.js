$(document).ready(function() {
    $("main").fadeIn(2500);
});

//START GAME--------------------------------------------------------------------------
$(document).ready(function() {
    // Event listener for the Start button
    $("#start-btn").on("click", startGame);
});

function startGame() {
    // Hide the start button and the intro, and show the game container
    $("#start-btn, #intro").addClass("hidden");
    $("#game-container").removeClass("hidden");
    showFirstQuestion();
}

//Show Branch Question--------------------------------------------------------------------------
function showFirstQuestion() {
    const questionElement = document.getElementById('question-box');
    questionElement.innerText = question[0].question;
}

//QUESTIONS--------------------------------------------------------------------------
    // Branch Question
    const firstQuestion = [
        {
            question: "When the city plunges into darkness, what stirs within you?",
            answers: [
                { text: "The desire to strike fear into the hearts of criminals"},
                { text: "The determination to be a beacon of hope for the people"},
                { text: "The urge to exploit chaos and seize power"},
                { text: "The commitment to uphold justice and restore order"}
            ]
        },
    ]