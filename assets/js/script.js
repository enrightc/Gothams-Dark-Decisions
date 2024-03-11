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
    showFirstQuestion(firstQuestion);
}

//Show Branch Question--------------------------------------------------------------------------
function showFirstQuestion(firstQuestion) {
    $('#question-box').text(firstQuestion[0].question);


}

//QUESTIONS--------------------------------------------------------------------------
    // Branch Question
    const firstQuestion = [
        {
            question: "As the figure approaches, you see a glint of concern in their eyes. They offer you a hand and ask, 'Are you alright? You seem lost.' How do you respond?",
            answers: [
                {
                    answerNumber: 1,
                    text: "Accept their help gratefully, hoping they can shed light on your situation",
                    personality: "hero"
                },
                {
                    answerNumber: 2,
                    text: "Politely decline, feeling uneasy about trusting a stranger in this unfamiliar place",
                    personality: "villain"
                }
            ]
        }
    ];
    