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

    const answerButtonsElement = $('#answer-box');
    // Loop through the answers and create button elements
    firstQuestion[0].answers.forEach(answer => {
    // Create a button element
    const button = $('<button></button>');
    // Set button text
    button.text(answer.text);
    // Add a class to the button
    button.addClass('ans-btn');
    // Append the button to the answerButtonsElement
    answerButtonsElement.append(button);
    });
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

// Hero Question
const heroQuestions = [
    {
        questionNumber: 1,
        question: "You accept the stranger's help and follow them to a hidden room filled with newspaper clippings, photographs, and documents. They reveal that you were once a renowned detective, but your memory loss has left you vulnerable. How do you react to this revelation?",
        answers: [
            {
                answerNumber: 1,
                text: "Embrace your past and begin piecing together the clues to uncover the truth (Batman)",
                score: 6,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Seek further proof before fully accepting your identity as a detective (Nightwing)",
                score: 5,
                personality: "Nightwing"
            },
            {
                answerNumber: 3,
                text: "Express gratitude for the stranger's help and offer to assist them in their own investigations (Batgirl)",
                score: 4,
                personality: "Batgirl"
            },
            {
                answerNumber: 4,
                text: "Remain skeptical and continue searching for answers on your own (Red Hood)",
                score: 3,
                personality: "Red Hood"
            },
            {
                answerNumber: 5,
                text: "Use the information to your advantage, planning your next move with cunning precision (Robin)",
                score: 2,
                personality: "Robin"
            },
            {
                answerNumber: 6,
                text: "Laugh off the revelation, dismissing the importance of your past in favor of living in the present (Batwoman)",
                score: 1,
                personality: "Batwoman"
            }
        ]
    },
    {
        questionNumber: 2,
        question: "As you delve deeper into the mystery of your identity, you uncover a trail of clues leading to a notorious criminal organization operating in the shadows of Gotham. How do you choose to confront this threat?",
        answers: [
            {
                answerNumber: 1,
                text: "Gather evidence and build a case against the organization, using your intellect and cunning to outsmart them (Batman)",
                score: 6,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Confront the organization head-on, using your skills and determination to bring them to justice (Nightwing)",
                score: 5,
                personality: "Nightwing"
            },
            {
                answerNumber: 3,
                text: "Seek assistance from trusted allies or other heroes to take down the criminal organization (Robin)",
                score: 4,
                personality: "Robin"
            },
            {
                answerNumber: 4,
                text: "Infiltrate the organization from within, using stealth and deception to dismantle it from the inside (Red Hood)",
                score: 3,
                personality: "Red Hood"
            },
            {
                answerNumber: 5,
                text: "Manipulate the situation to your advantage, playing both sides to achieve your own goals (Batgirl)",
                score: 2,
                personality: "Batgirl"
            },
            {
                answerNumber: 6,
                text: "Take a more diplomatic approach, seeking to negotiate with the organization to avoid unnecessary violence (Batwoman)",
                score: 1,
                personality: "Batwoman"
            }
        ]
    },
    {
        questionNumber: 3,
        question: "The final confrontation with the leader of the criminal organization takes place in a deserted warehouse on the outskirts of Gotham. How do you approach this dangerous encounter?",
        answers: [
            {
                answerNumber: 1,
                text: "Engage in a battle of wits, using your intellect and deductive reasoning to outsmart your opponent (Batman)",
                score: 6,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Prepare for a physical confrontation, knowing that only one of you will emerge victorious (Nightwing)",
                score: 5,
                personality: "Nightwing"
            },
            {
                answerNumber: 3,
                text: "Call upon allies for backup, knowing that strength lies in numbers (Robin)",
                score: 4,
                personality: "Robin"
            },
            {
                answerNumber: 4,
                text: "Confront the leader alone, prepared to face whatever challenges lie ahead (Red Hood)",
                score: 3,
                personality: "Red Hood"
            },
            {
                answerNumber: 5,
                text: "Use your agility and cunning to gain the upper hand in the confrontation (Batgirl)",
                score: 2,
                personality: "Batgirl"
            },
            {
                answerNumber: 6,
                text: "Negotiate with the leader, seeking a peaceful resolution to the conflict (Batwoman)",
                score: 1,
                personality: "Batwoman"
            }
        ]
    }
];

    