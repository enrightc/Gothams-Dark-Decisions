// Add fadeIn transition to quiz introduction.
$(document).ready(function() {
    $("main").fadeIn(3000);
});

// Essential elements
const answerButtonsElement = $('#answer-box');
let Batman = 0;
let Robin = 0;
let RedHood = 0;
let Batgirl = 0;
let theJoker = 0;
let thePenguin = 0;
let Bane = 0;
let Catwoman = 0;
let currentHeroQuestionIndex = 0;
let currentVillainQuestionIndex = 0;
let userCharacter;
let personality;

//START GAME--------------------------------------------------------------------------
$(document).ready(function() {
    // Event listener for the Start button
    $("#start-btn").on("click", function() {
        startGame(); // Calls the startGame function when the start button is clicked
    });
});

function startGame() {
    // Fade out the main container
    $("main").fadeOut(2000, function() {
        // Hide the intro
        $("#intro").addClass("hidden");
        // Fade in the main container
        $("main").fadeIn(1000);
        // Show the game container
        $("#game-container").removeClass("hidden");
        // Call showFirstQuestion function to display the first question
        showFirstQuestion(0);
    });
}


//Show Branch Question--------------------------------------------------------------------------
function showFirstQuestion(index) {
    const question = firstQuestion[index];
    // use jQuery .text() method to set text content of question-box element to text of first question
    $('#title').text(question.title);
    $('#question-box').text(question.question);
    // Set the background image of the body
    $('body').css('background-image', 'url("' + question.background + '")');
    
    // Display Answer: Adapted from https://hackr.io/blog/how-to-build-a-javascript-quiz-app
    // Loop through the answers and create button elements using foreach() with arrow function
    question.answers.forEach(answer => {
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
        personality = $(this).data("personality");
        // Check the personality property of the answer.
        if (personality === "hero") {
            startHeroPath()
            console.log(personality)
        } else {
            startVillainPath();
            console.log(personality)
        }
    
    })
};

//Start Hero Path--------------------------------------------------------------------------
function startHeroPath() {
    // Display the first hero question with a fade-in effect
    nextHeroQuestion(currentHeroQuestionIndex);
}

function nextHeroQuestion(index) {
    // Fade out the main container
    $("main").fadeOut(1000, function() {
        // Collects the hero question object from the heroQuestions array.
        const question = heroQuestions[index];

        // Sets the text of the element to text of current question.
        $('#title').text(question.title);
        $('#question-box').text(question.question);

         // Set the background image of the body. Adapted from Satpal (Stackflow user; see references).
        $('body').css('background-image', 'url("' + question.image + '")');
        
        // Clear previous answer buttons using .empty method
        answerButtonsElement.empty();

        // display Answers using forEach with arrow function.
        question.answers.forEach(answer => {
            const button = $('<button></button>');
            button.text(answer.text);
            button.addClass('hero-ans-btn');
            button.data('character', answer.character); // Add data attribute for personality
            answerButtonsElement.append(button);
        });

        // Attach event listener to handle user response
        $(".hero-ans-btn").on("click", function() {
            const character = $(this).data("character");
            
            // Increment Batman score only if the clicked button has the personality "Batman"
            if (character === "Batman") {
                Batman++; // Increment Batman score
                console.log("Batman score:", Batman);
            } else if (character === "Robin") {
                Robin++;
                console.log("Robin score", Robin)
            } else if (character === "Red Hood") {
                RedHood++;
                console.log("Red Hood score", RedHood)
            } else {
                Batgirl++;
                console.log("Batgirl score", Batgirl)
            }
            
            // Move to the next hero question or end the path if there are no more questions
            currentHeroQuestionIndex++;
            if (currentHeroQuestionIndex < heroQuestions.length) {
                // Call nextHeroQuestion recursively with a fade-in effect
                nextHeroQuestion(currentHeroQuestionIndex);
            } else {
                // No more hero questions, end the hero path
                results();
            }
        });

        // Fade in the main container
        $("main").fadeIn(1000);
    });
}


//Start Villain Path--------------------------------------------------------------------------
function startVillainPath() {
    // Display the first hero question
    console.log(currentVillainQuestionIndex);
    nextVillainQuestion(currentVillainQuestionIndex);
};

function nextVillainQuestion(index) {
    // Fade out the main container
    $("main").fadeOut(1000, function() {
    // Collects the hero question object from the heroQuestions array.
    const question = villainQuestions[index];
    // Sets the text of the element to text of current question.
    $('#title').text(question.title);
    $('#question-box').text(question.question);

     // Set the background image of the body. Adapted from Satpal (Stackflow user; see references).
     $('body').css('background-image', 'url("' + question.image + '")');
    
    // Clear previous answer buttons using .empty method
    answerButtonsElement.empty();

    // display Answers using forEach with arrow function.
    question.answers.forEach(answer => {
        const button = $('<button></button>');
        button.text(answer.text);
        button.addClass('villain-ans-btn');
        button.data('character', answer.character); // Add data attribute for personality
        answerButtonsElement.append(button);
    });

    // Attach event listener to handle user response
    $(".villain-ans-btn").on("click", function() {
        const character = $(this).data("character");
        
        // Increment Batman score only if the clicked button has the personality "Batman"
        if (character === "The Joker") {
            theJoker++; // Increment Batman score
            console.log("The Joker score:", theJoker);
        } else if (character === "The Penquin") {
            thePenguin++;
            console.log("The Penguin score", thePenguin)
        } else if (character === "Bane") {
            Bane++;
            console.log("Bane score", Bane)
        } else {
            Catwoman++;
            console.log("Catwoman score", Catwoman)
        }
        
        // Move to the next hero question or end the path if there are no more questions
        currentVillainQuestionIndex++;
        if (currentVillainQuestionIndex < villainQuestions.length) {
            nextVillainQuestion(currentVillainQuestionIndex);
        } else {
            // No more hero questions, end the hero path
            results();
        }
    });

     // Fade in the main container
     $("main").fadeIn(1000);
    });
}

//Results Function--------------------------------------------------------------------------

function results() {
    $("main").fadeOut(1000, function() {
    $("#game-container").addClass("hidden");
    $("#results-container").removeClass("hidden");
    if (personality === "hero") {
        $(".hero-revelation").removeClass("hidden");
        $('body').css('background-image', 'url("assets/images/hero-revelation-background.webp")');
    } else {
        $(".villain-revelation").removeClass("hidden");
        $('body').css('background-image', 'url("assets/images/villain-revelation-background.webp")');
    }
    $("main").fadeIn(1000);
    });

    

 
    revelation();

    $("p.character").append(userCharacter);
}

function revelation() {
    let maxScore = Math.max(Batman, Robin, RedHood, Batgirl,theJoker, thePenguin, Bane, Catwoman);
    if (maxScore === Batman) {
        userCharacter = "Batman";
    } else if (maxScore === Robin) {
        userCharacter = "Robin";
    } else if (maxScore === RedHood) {
        userCharacter = "Red Hood";
    } else if (maxScore === Batgirl) {
        userCharacter = "Batgirl";
    } else if (maxScore === theJoker) {
        userCharacter = "The Joker"; 
    } else if (maxScore === thePenguin) {
        userCharacter = "The Penguin";
    } else if (maxScore === Bane) {
        userCharacter = "Bane";
    } else if (maxScore === Catwoman) {
        userCharacter = "Catwoman";
    }
    console.log("You are", userCharacter)
}

//Voiceover--------------------------------------------------------------------------
// from Alon Zilberman on stackflow
document.getElementById("play-pause").addEventListener("click", function(){
    var audio = document.getElementById('voiceover');
    if(this.className == 'is-playing'){
        this.className = "";
        this.textContent = "▶"; // Play symbol
        audio.pause();
    } else {
        this.className = "is-playing";
        this.textContent = "❚❚"; // Pause symbol
        audio.play();
    }
});

// Set the initial content to the play symbol
document.getElementById("play-pause").textContent = "▶";


//QUESTIONS--------------------------------------------------------------------------
// Branch Question
const firstQuestion = [
    {
        title: "Chapter 1: The Choice",
        question: "As the figure approaches, you see a glint of concern in their eyes. They offer you a hand and ask, 'Are you alright? You seem lost.' How do you respond?",
        background: "assets/images/chapter-1-the-choice.webp",
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
        question: "You accept the stranger's help and follow them to a hidden room filled with newspaper clippings, photographs, and documents. They reveal that you were once a renowned detective, but your memory loss has left you vulnerable. How do you react to this revelation?",image: "assets/images/the-choice.webp",
        image: "assets/images/hero-chapter-2.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Embrace your past and begin piecing together the clues to uncover the truth.",
                score: 4,
                personality: "Hero",
                character: "Batman"
            },
            {
                answerNumber: 2,
                text: "Seek further proof before fully accepting your identity as a detective.",
                score: 3,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 3,
                text: "Express gratitude for the stranger's help but make it clear that you work alone, preferring to handle matters your own way.",
                score: 2,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Remain skeptical and continue searching for answers on your own.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 3: Unravelling the Mystery",
        questionNumber: 3,
        question: "Unraveling the Mystery: As you delve deeper into the mystery of your identity, you uncover a trail of clues leading to a notorious criminal organisation operating in the shadows of Gotham. How do you choose to confront this threat?",
        image: "assets/images/hero-chapter-3.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Gather evidence and build a case against the organisation, using your intellect and cunning to outsmart them.",
                score: 4,
                personality: "Hero",
                character: "Batman"
            },
            {
                answerNumber: 2,
                text: "Confront the organisation head-on, using your combat skills to dismantle them and put an end to their criminal activities.",
                score: 3,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 3,
                text: "Seek assistance from trusted allies or other heroes to take down the criminal organisation.",
                score: 2,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 4,
                text: "Infiltrate the organisation from within, using stealth and deception to dismantle it from the inside.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 4: The Water Supply Threat",
        questionNumber: 4,
        question: "While investigating, you overhear a conversation revealing that a criminal gang plans to poison Gotham's water supply. How do you choose to respond?",
        image: "assets/images/hero-chapter-4.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Immediately mobilise your resources to stop the poisoning, utilising your network and investigative skills to uncover the gang's operation and dismantle it from within.",
                score: 4,
                personality: "Hero",
                character: "Batman"
            },
            {
                answerNumber: 2,
                text: "Gather evidence to expose the plot and rally public support against the criminals.",
                score: 3,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 3,
                text: "Infiltrate the gang's hideout to gather intelligence and thwart their plans.",
                score: 2,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Utilise your technological expertise to hack into the gang's communication channels and disrupt their operation.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 5: Infiltrating the Enemy Hideout",
        questionNumber: 5,
        question: "You learn the location of the criminal organisation's hideout and must decide how to approach it. How do you proceed?",
        image: "assets/images/hero-chapter-5.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Conduct surveillance to gather information and assess the enemy's strength before taking action.",
                score: 4,
                personality: "Hero",
                character: "Batman"
            },
            {
                answerNumber: 2,
                text: "Formulate a strategic plan to infiltrate the hideout and neutralise the threat.",
                score: 3,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 3,
                text: "Launch a surprise attack on the hideout, catching the criminals off guard.",
                score: 2,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Utilise your agility and stealth to sneak into the hideout undetected.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 6: Rescuing the Hostages",
        questionNumber: 6,
        question: "While investigating the hideout, you discover innocent hostages being held captive by the criminals. How do you proceed?",
        image: "assets/images/hero-chapter-6.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Strategise a plan to rescue the hostages while minimising collateral damage.",
                score: 4,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 2,
                text: "Coordinate with your allies to execute a swift and efficient rescue operation.",
                score: 3,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 3,
                text: "Take decisive action to neutralizs the threat and free the hostages, accepting that there maybe collaleral damage.",
                score: 2,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Use your agility and stealth to navigate the hideout and rescue the hostages undetected.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 7: Escaping the Villain's Lair",
        questionNumber: 7,
        image: "assets/images/hero-chapter-7.webp",
        question: "After freeing the hostages you are captured by the villainous mastermind, you find yourself imprisoned in their elaborate and heavily guarded lair. How do you plan your daring escape?",
        answers: [
            {
                answerNumber: 1,
                text: "Use your keen detective skills to uncover weaknesses in the lair's security system and exploit them to break free.",
                score: 4,
                personality: "Hero",
                character: "Batman"
            },
            {
                answerNumber: 2,
                text: "Overpower your guards with swift and decisive combat techniques, seizing their weapons and using them to fight your way out.",
                score: 3,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 3,
                text: "Create a diversion by sabotaging the lair's infrastructure, causing chaos and confusion that allows you to slip away unnoticed.",
                score: 2,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 4,
                text: "Utilise your acrobatic agility to navigate the perilous obstacles of the lair, finding hidden passages and escape routes to freedom.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 8: The Final Confrontation",
        questionNumber: 8,
        image: "assets/images/hero-chapter-8.webp",
        question: "After escaping you face the leader of the criminal organisation in a final showdown. How do you approach this dangerous encounter?",
        answers: [
            {
                answerNumber: 1,
                text: "Utilise your intellect and strategic planning to outwit the leader and bring them to justice.",
                score: 4,
                personality: "Hero",
                character: "Batman"
            },
            {
                answerNumber: 2,
                text: "Engage in a physical battle, determined to defeat the leader and end their reign of terror.",
                score: 3,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 3,
                text: "Call upon your allies for support, knowing that together, you can overcome any challenge.",
                score: 2,
                personality: "Hero",
                character: "Robin"
            },
            {
                answerNumber: 4,
                text: "Confront the leader alone, prepared to face whatever dangers may arise.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    }
];

// Villain Questions
const villainQuestions = [
    {
        title: "Chapter 2: The Rise of Darkness",
        question: "As you emerge from the shadows of Gotham's underworld, you realize the potential for power and control that lies within your grasp. How do you begin your journey to ascendancy?",
        image: "assets/images/villain-chapter-2.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Manipulate and deceive those around you, using their trust to further your own ambitions.",
                score: 4,
                personality: "Villain",
                character: "The Joker"
            },
            {
                answerNumber: 2,
                text: "Assert dominance through displays of force and violence, ensuring that none dare oppose you.",
                score: 3,
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Form alliances with other emerging villains, pooling resources to strengthen your foothold in the city.",
                score: 2,
                personality: "Villain",
                character: "The Penguin"
            },
            {
                answerNumber: 4,
                text: "Utilise your cunning and intellect to outmaneuver rivals, securing your position as a rising force in Gotham's criminal hierarchy.",
                score: 1,
                personality: "Villain",
                character: "Catwoman"
            }
        ]
    },
    {
        title: "Chapter 3: Hostage Crisis",
        question: "You've captured a group of hostages in your latest scheme. How do you use them to further your agenda and maintain control?",
        image: "assets/images/villain-chapter-3.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Threaten to harm the hostages unless your demands are met, instilling fear in both the authorities and the public.",
                score: 4,
                personality: "Villain",
                character: "The Penguin"
            },
            {
                answerNumber: 2,
                text: "Publicly showcase the hostages as a display of your power, daring anyone to challenge your authority.",
                score: 3,
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Use the hostages as leverage to negotiate favourable terms with the authorities, ensuring that your interests are protected.",
                score: 2,
                personality: "Villain",
                character: "The Joker"
            },
            {
                answerNumber: 4,
                text: "Exploit the emotional connection between the hostages and the public to manipulate public opinion and garner support for your cause.",
                score: 1,
                personality: "Villain",
                character: "Catwoman"
            }
        ]
    },
    {
        title: "Chapter 4: Evading Capture",
        question: "As law enforcement closes in on your location, how do you evade capture?",
        answers: [
            {
                answerNumber: 1,
                text: "Use the hostages as human shields, daring the authorities to risk innocent lives in their pursuit of justice.",
                score: 4,
                personality: "Villain",
                character: "The Penguin"
            },
            {
                answerNumber: 2,
                text: "Stage a diversionary tactic to distract the authorities while you quietly slip away with the hostages.",
                score: 3,
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Release the hostages unharmed as a sign of goodwill, buying yourself time to plan your next move without drawing unnecessary attention.",
                score: 2,
                personality: "Villain",
                character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Impersonate a hostage yourself, infiltrating the authorities' ranks to gather intelligence and turn the situation to your advantage.",
                score: 1,
                personality: "Villain",
                character: "The Joker"
            }
        ]
    },
    {
        title: "Chapter 5: Reign of Terror",
        question: "With Gotham firmly in your grip, you now seek to instill fear and obedience among its inhabitants. How do you maintain your iron rule over the city?",
        image: "assets/images/villain-chapter-5.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Rule through fear and brutality, ensuring that dissenters are swiftly and ruthlessly dealt with.",
                score: 4,
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 2,
                text: "Establish a network of loyal enforcers and minions, enforcing your will through intimidation and violence.",
                score: 3,
                personality: "Villain",
                character: "The Penguin"
            },
            {
                answerNumber: 3,
                text: "Exploit the weaknesses and vulnerabilities of Gotham's institutions, corrupting them to serve your own nefarious ends.",
                score: 2,
                personality: "Villain",
                character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Stay one step ahead of your enemies, using your cunning and intellect to outmaneuver any threats to your reign.",
                score: 1,
                personality: "Villain",
                character: "The Joker"
            }
        ]
    },
    {
        title: "Chapter 6: Final Showdown",
        question: "As the heroes rally to challenge your reign of terror, you prepare for a final confrontation to determine the fate of Gotham. How do you intend to emerge victorious and solidify your legacy as the city's ultimate villain?",
        answers: [
            {
                answerNumber: 1,
                text: "Unleash chaos and destruction upon the city, disrupting the heroes' plans and plunging Gotham into darkness.",
                personality: "Villain",
                character: "The Joker"
            },
            {
                answerNumber: 2,
                text: "Engage the heroes in a brutal showdown, using your sheer strength and combat prowess to overpower them.",
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 3,
                text: "Outmaneuver the heroes at every turn, exploiting their weaknesses and vulnerabilities to gain the upper hand.",
                personality: "Villain",
                character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Challenge the heroes to a final battle of wits and strategy, pitting your cunning intellect against their unwavering determination.",
                personality: "Villain",
                character: "The Penguin"
            }
        ]
    },
    {
        title: "Chapter 7: Subjugation",
        question: "With the heroes defeated and Gotham firmly under your control, you now seek to crush any remaining resistance and assert your dominance over the city. How do you ensure that none dare oppose you?",
        image: "assets/images/villain-chapter-7.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Instill fear and obedience among the populace, ensuring that any who dare oppose you are swiftly and mercilessly dealt with.",
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 2,
                text: "Establish a network of spies and informants, rooting out dissent and rebellion before it can take hold.",
                personality: "Villain",
                character: "The Penguin"
            },
            {
                answerNumber: 3,
                text: "Exploit the city's infrastructure and resources, using them to maintain your grip on power and crush any who would oppose you.",
                personality: "Villain",
                character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Stay one step ahead of any potential threats, using your cunning and intellect to thwart any attempts to challenge your rule.",
                personality: "Villain",
                character: "The Joker"
            }
        ]
    },
    {
        title: "Chapter 8: Eternal Darkness",
        question: "With your grip on power unchallenged and your dominion extending far beyond Gotham, you now seek to establish an eternal legacy of darkness and fear. How do you ensure that your reign of terror will endure for generations to come?",
        image: "assets/images/villain-chapter-8.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Crush any who dare oppose you with overwhelming force, ensuring that none dare challenge your authority.",
                personality: "Villain",
                character: "Bane"
            },
            {
                answerNumber: 2,
                text: "Establish a cult of personality around yourself, ensuring that your name strikes fear into the hearts of all who hear it.",
                personality: "Villain",
                character: "The Penguin"
            },
            {
                answerNumber: 3,
                text: "Exploit the fears and insecurities of the populace, using them to maintain control and suppress any who would rebel against you.",
                personality: "Villain",
                character: "Catwoman"
            },
            {
                answerNumber: 4,
                text: "Stay one step ahead of any potential threats, using your cunning and intellect to thwart any attempts to overthrow your rule.",
                personality: "Villain",
                character: "The Joker"
            }
        ]
    }
];
