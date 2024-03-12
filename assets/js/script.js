// Add fadeIn transition to quiz introduction.
$(document).ready(function() {
    $("main").fadeIn(2500);
});

// Essential elements
const answerButtonsElement = $('#answer-box');
let  Batman = 0;
let Robin = 0;
let RedHood = 0;
let Batgirl = 0;

let userPersonality;
let currentHeroQuestionIndex = 0;

//START GAME--------------------------------------------------------------------------
$(document).ready(function() {
    // Event listener for the Start button
    $("#start-btn").on("click", startGame);
});

function startGame() {
    // Hide the start button and the intro, show the game container and call showFirstQuestion function.
    $("#start-btn, #intro").addClass("hidden");
    $("#game-container").removeClass("hidden");
    showFirstQuestion(firstQuestion);
}

//Show Branch Question--------------------------------------------------------------------------
//Show Branch Question--------------------------------------------------------------------------
function showFirstQuestion(firstQuestion) {
    // use jQuery .text() method to set text content of question-box element to text of first question
    $('#question-box').text(firstQuestion[0].question);

    
    // Display Answer: Adapted from https://hackr.io/blog/how-to-build-a-javascript-quiz-app
    // Loop through the answers and create button elements using foreach() with arrow function
    firstQuestion[0].answers.forEach(answer => {
    // Create a button element with jQuery
    const button = $('<button></button>');
    // Set button text
    button.text(answer.text);
    // Add a class to the button
    button.addClass('ans-btn');
    // Add data attribute for personality
    button.data('personality', answer.personality); 
    // Append the button to the answerButtonsElement
    answerButtonsElement.append(button);
    });

    // Add event to .ans-btn
    $(".ans-btn").on("click", function() {
        const personality = $(this).data("personality");
        // Check the personality property of the answer.
        if (personality === "hero") {
            startHeroPath()
            console.log(personality)
        } else {
            startVillainPath()
            console.log(personality)
        }
    
    })
};

//Start Hero Path--------------------------------------------------------------------------
function startHeroPath() {
    // Display the first hero question
    nextHeroQuestion(currentHeroQuestionIndex);
}

function nextHeroQuestion(index) {
    // Collects the hero question object from the heroQuestions array.
    const question = heroQuestions[index];
    // Sets the text of the element to text of current question.
    $('#question-box').text(question.question);

    // Clear previous answer buttons using .empty method
    answerButtonsElement.empty();

    // display Answers using forEach with arrow function.
    question.answers.forEach(answer => {
        const button = $('<button></button>');
        button.text(answer.text);
        button.addClass('hero-ans-btn');
        button.data('personality', answer.personality); // Add data attribute for personality
        answerButtonsElement.append(button);
    });

    // Attach event listener to handle user response
    $(".hero-ans-btn").on("click", function() {
        const personality = $(this).data("personality");
        
        // Increment Batman score only if the clicked button has the personality "Batman"
        if (personality === "Batman") {
            Batman++; // Increment Batman score
            console.log("Batman score:", Batman);
        } else if (personality === "Robin") {
            Robin++;
            console.log("Robin score", Robin)
        } else if (personality === "Red Hood") {
            RedHood++;
            console.log("Red Hood score", RedHood)
        } else {
            Batgirl++;
            console.log("Batgirl score", Batgirl)
        }
        
        // Move to the next hero question or end the path if there are no more questions
        currentHeroQuestionIndex++;
        if (currentHeroQuestionIndex < heroQuestions.length) {
            nextHeroQuestion(currentHeroQuestionIndex);
        } else {
            // No more hero questions, end the hero path
            results();
        }

        revelation() 
    });
}

function revelation() {
    let maxScore = Math.max(Batman, Robin, RedHood, Batgirl);
    if (maxScore === Batman) {
        userPersonality = "Batman";
    } else if (maxScore === Robin) {
        userPersonality = "Robin";
    } else if (maxScore === RedHood) {
        userPersonality = "Red Hood";
    } else if (maxScore === Batgirl) {
        userPersonality = "Batgirl";
    }
    console.log("You are", userPersonality)
}

function results() {
    $("#game-container").addClass("hidden");
    $("#results-container").removeClass("hidden");

    $("p.character").append(userPersonality);
}

function endHeroPath() {
    console.log("Out of Hero questions");
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

// Hero Questions
const heroQuestions = [
    {
        questionNumber: 2,
        question: "Embracing Your Past: You accept the stranger's help and follow them to a hidden room filled with newspaper clippings, photographs, and documents. They reveal that you were once a renowned detective, but your memory loss has left you vulnerable. How do you react to this revelation?",
        answers: [
            {
                answerNumber: 1,
                text: "Embrace your past and begin piecing together the clues to uncover the truth.",
                score: 4,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Seek further proof before fully accepting your identity as a detective.",
                score: 3,
                personality: "Robin"
            },
            {
                answerNumber: 3,
                text: "Express gratitude for the stranger's help and offer to assist them in their own investigations.",
                score: 2,
                personality: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Remain skeptical and continue searching for answers on your own.",
                score: 1,
                personality: "Batgirl"
            }
        ]
    },
    {
        questionNumber: 3,
        question: "Unraveling the Mystery: As you delve deeper into the mystery of your identity, you uncover a trail of clues leading to a notorious criminal organization operating in the shadows of Gotham. How do you choose to confront this threat?",
        answers: [
            {
                answerNumber: 1,
                text: "Gather evidence and build a case against the organization, using your intellect and cunning to outsmart them.",
                score: 4,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Confront the organization head-on, using your skills and determination to bring them to justice.",
                score: 3,
                personality: "Robin"
            },
            {
                answerNumber: 3,
                text: "Seek assistance from trusted allies or other heroes to take down the criminal organization.",
                score: 2,
                personality: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Infiltrate the organization from within, using stealth and deception to dismantle it from the inside.",
                score: 1,
                personality: "Batgirl"
            }
        ]
    },
    {
        questionNumber: 4,
        question: "The Water Supply Threat: While investigating, you overhear a conversation revealing that a criminal gang plans to poison Gotham's water supply. How do you choose to respond?",
        answers: [
            {
                answerNumber: 1,
                text: "Immediately inform the authorities and devise a plan to stop the poisoning.",
                score: 4,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Gather evidence to expose the plot and rally public support against the criminals.",
                score: 3,
                personality: "Robin"
            },
            {
                answerNumber: 3,
                text: "Infiltrate the gang's hideout to gather intelligence and thwart their plans.",
                score: 2,
                personality: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Utilize your technological expertise to hack into the gang's communication channels and disrupt their operation.",
                score: 1,
                personality: "Batgirl"
            }
        ]
    },
    {
        questionNumber: 5,
        question: "Infiltrating the Enemy Hideout: You learn the location of the criminal organization's hideout and must decide how to approach it. How do you proceed?",
        answers: [
            {
                answerNumber: 1,
                text: "Conduct surveillance to gather information and assess the enemy's strength before taking action.",
                score: 4,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Formulate a strategic plan to infiltrate the hideout and neutralize the threat.",
                score: 3,
                personality: "Robin"
            },
            {
                answerNumber: 3,
                text: "Launch a surprise attack on the hideout, catching the criminals off guard.",
                score: 2,
                personality: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Utilize your agility and stealth to sneak into the hideout undetected.",
                score: 1,
                personality: "Batgirl"
            }
        ]
    },
    {
        questionNumber: 6,
        question: "Rescuing Hostages: While investigating the hideout, you discover innocent hostages being held captive by the criminals. How do you proceed?",
        answers: [
            {
                answerNumber: 1,
                text: "Strategize a plan to rescue the hostages while minimizing collateral damage.",
                score: 4,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Coordinate with your allies to execute a swift and efficient rescue operation.",
                score: 3,
                personality: "Robin"
            },
            {
                answerNumber: 3,
                text: "Take decisive action to neutralize the threat and free the hostages.",
                score: 2,
                personality: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Use your agility and stealth to navigate the hideout and rescue the hostages undetected.",
                score: 1,
                personality: "Batgirl"
            }
        ]
    },
    {
        questionNumber: 7,
        question: "Final Confrontation: After freeing the hostages, you face the leader of the criminal organization in a final showdown. How do you approach this dangerous encounter?",
        answers: [
            {
                answerNumber: 1,
                text: "Utilize your intellect and strategic planning to outwit the leader and bring them to justice.",
                score: 4,
                personality: "Batman"
            },
            {
                answerNumber: 2,
                text: "Engage in a physical battle, determined to defeat the leader and end their reign of terror.",
                score: 3,
                personality: "Robin"
            },
            {
                answerNumber: 3,
                text: "Call upon your allies for support, knowing that together, you can overcome any challenge.",
                score: 2,
                personality: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Confront the leader alone, prepared to face whatever dangers may arise.",
                score: 1,
                personality: "Batgirl"
            }
        ]
    }
];