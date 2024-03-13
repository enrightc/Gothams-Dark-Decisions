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
let currentVillainQuestionIndex = 0;


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
    $('#title').text(firstQuestion[0].title);
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
    $('#title').text(question.title);
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
 


//Start Villain Path--------------------------------------------------------------------------
function startVillainPath() {
    // Display the first hero question
    nextVillainQuestion(currentVillainQuestionIndex);
};

function nextVillainQuestion(index) {
    // Collects the hero question object from the heroQuestions array.
    const question = villainQuestions[index];
    // Sets the text of the element to text of current question.
    $('#title').text(question.title);
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
}
 


//QUESTIONS--------------------------------------------------------------------------
// Branch Question
const firstQuestion = [
    {
        title: "The Choice",
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
        title: "Chapter 2: Embracing Your Past",
        questionNumber: 2,
        question: "You accept the stranger's help and follow them to a hidden room filled with newspaper clippings, photographs, and documents. They reveal that you were once a renowned detective, but your memory loss has left you vulnerable. How do you react to this revelation?",
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
        title: "Chapter 3: Unravelling the Mystery",
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
        title: "Chapter 4: The Water Supply Threat",
        questionNumber: 4,
        question: "While investigating, you overhear a conversation revealing that a criminal gang plans to poison Gotham's water supply. How do you choose to respond?",
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
        title: "Chapter 5: Infiltrating the Enemy Hideout",
        questionNumber: 5,
        question: "You learn the location of the criminal organization's hideout and must decide how to approach it. How do you proceed?",
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
        title: "Chapter 6: Rescuing the Hostages",
        questionNumber: 6,
        question: "While investigating the hideout, you discover innocent hostages being held captive by the criminals. How do you proceed?",
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
        title: "Chapter 7: The Final Confrontation",
        questionNumber: 7,
        question: "After freeing the hostages, you face the leader of the criminal organization in a final showdown. How do you approach this dangerous encounter?",
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

// Villain Questions
const villainQuestions = [
    {
        title: "Chapter 2: The Villain's Path",
        question: "You choose to decline the stranger's offer, preferring to rely on your own instincts and resources. As you explore the dark alleys of Gotham, a sense of power begins to course through you. You realize that you possess abilities beyond those of ordinary men and women, and you are determined to use them to carve out your own path in this city of shadows.",
        answers: [
            {
                answerNumber: 1,
                text: "Use manipulation and deception to manipulate others and seize control.",
                score: 4,
                personality: "Villain",
                Character: "The Penguin"
            },
            {
                answerNumber: 2,
                text: "Employ brute force and intimidation to crush anyone who stands in your way.",
                score: 3,
                personality: "Villain",
                Character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Form alliances with other powerful villains to expand your influence and territory.",
                score: 2,
                personality: "Villain",
                Character: "The Joker"
            },
            {
                answerNumber: 4,
                text: "Utilize your intellect to outsmart your rivals and secure your position as the city's most feared villain.",
                score: 1,
                personality: "Villain",
                Character: "Catwoman"
            }
        ]
    },
    {
        title: "Chapter 3: Embracing the Darkness",
        question: "You find yourself drawn to the darker side of Gotham, where crime and corruption reign supreme. Instead of fighting against it, you decide to embrace the darkness, using your newfound powers to rise to the top of the criminal underworld. How do you plan to establish your dominance?",
        answers: [
            {
                answerNumber: 1,
                text: "Use manipulation and deception to manipulate others and seize control.",
                score: 4,
                personality: "Villain",
                Character: "The Penguin"
            },
            {
                answerNumber: 2,
                text: "Employ brute force and intimidation to crush anyone who stands in your way. ",
                score: 3,
                personality: "Villain",
                Character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Form alliances with other powerful villains to expand your influence and territory. ",
                score: 2,
                personality: "Villain",
                Character: "The Joker"
            },
            {
                answerNumber: 4,
                text: "Utilize your intellect to outsmart your rivals and secure your position as the city's most feared villain. ",
                score: 1,
                personality: "Villain",
                Character: "Catwoman"
            }
        ]
    },
    {
        title: "Chapter 4: The Reign of Terror",
        question: "With your power firmly established, you set about imposing your will upon the city. Your name strikes fear into the hearts of Gotham's citizens, and your enemies tremble at the sound of your footsteps. How do you maintain your iron grip on the city?",
        answers: [
            {
                answerNumber: 1,
                text: "Rule through fear and intimidation, crushing any dissent with ruthless efficiency. ",
                score: 4,
                personality: "Villain",
                Character: "Bane"
            },
            {
                answerNumber: 2,
                text: "Establish a network of loyal followers and enforcers to enforce your will. ",
                score: 3,
                personality: "Villain",
                Character: "The Penguin"
            },
            {
                answerNumber: 3,
                text: "Exploit the city's weaknesses and vulnerabilities to maintain your control. ",
                score: 2,
                personality: "Villain",
                Character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Stay one step ahead of your enemies, using your cunning and intellect to outmaneuver them at every turn. ",
                score: 1,
                personality: "Villain",
                Character: "The Joker"
            }
        ]
    },
    {
        title: "Chapter 6: Expanding Your Influence",
        question: "As you solidify your control over Gotham's underworld, you seek to expand your influence beyond the city limits. How do you plan to extend your reach and establish dominance in neighboring territories?",
        answers: [
            {
                answerNumber: 1,
                text: "Manipulate local authorities and criminal organizations to bend to your will, using your persuasive skills to gain control.",
                personality: "Villain",
                Character: "The Penquin"
            },
            {
                answerNumber: 2,
                text: "Conquer neighboring territories through sheer force and intimidation, crushing opposition with overwhelming power.",
                personality: "Villain",
                Character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Forge alliances with other influential villains in neighboring cities, pooling resources and manpower to achieve mutual goals.",
                personality: "Villain",
                Character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Create chaos and disorder in neighboring territories, destabilizing existing power structures to pave the way for your ascension.",
                personality: "Villain",
                Character: "The Joker"
            }
        ]
    },
    {
        Title: "Chapter 8: The Final Confrontation",
        question: "As the heroes close in on your stronghold, you prepare for one last epic battle to determine the fate of Gotham. How do you intend to emerge victorious and solidify your legacy as the city's ultimate villain?",
        answers: [
            {
                answerNumber: 1,
                text: "Unleash chaos and mayhem upon the city, disrupting the heroes' plans and plunging Gotham into darkness.",
                personality: "Villain",
                Character: "The Joker"
            },
            {
                answerNumber: 2,
                text: "Engage the heroes in a brutal showdown, using your brute strength and combat prowess to overpower them.",
                personality: "Villain",
                Character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Outmaneuver the heroes at every turn, exploiting their weaknesses and vulnerabilities to gain the upper hand.",
                personality: "Villain",
                Character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Challenge the heroes to a final showdown of intellect and strategy, pitting your cunning mind against their unwavering determination.",
                personality: "Villain",
                Character: "The Penquin"
            }
        ]
    }
];
