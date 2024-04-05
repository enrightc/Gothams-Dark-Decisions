/*jshint esversion: 6 */

// This JavaScript file drives the interactivity of the "Gotham's Dark Decisions" quiz.
// It handles user inputs, quiz logic, question navigation, and computes the final character outcome.
// The quiz questions are included in arrays towards the end of this file. 

// fadeIn transition to quiz introduction, enhancing user experience with a smooth start.
$("main").fadeIn(2500);

// Essential elements-----------------------------------------------------------------
// Declaration of essential elements and variables for quiz logic.
const mainContainer = $("main");
const answerButtonsElement = $('#answer-box');
let batman = 0;
let robin = 0;
let redHood = 0;
let batgirl = 0;
let theJoker = 0;
let thePenguin = 0;
let bane = 0;
let catwoman = 0;
let currentHeroQuestionIndex = 0;
let currentVillainQuestionIndex = 0;
let userCharacter;
let personality;
let startBlocked = false;

//Event Listeners--------------------------------------------------------------------------

  // Event listener for the Start button to begin the quiz
  $("#start-btn").on("click", function() {
    // prevent multiple clicks of start button
    if (startBlocked == false){
        startBlocked = true;  // Set startBlocked to true to prevent further clicks
        startGame(); // Calls the startGame function when the start button is clicked
    }
});

// Attach a click event listener to the ans-btns within the '#answer-box' container to determine users chosen path (hero or villain) based on clicked buttons data attribute.
// Once user has made selection it initiates the corresponding path and disables all answer buttons to prevent further selections and add a class of selected to the button for visual verification.
$('#answer-box').on('click', '.ans-btn', function() {
    const personality = $(this).data("personality");

    // Check the selected personality (hero or villain) to filter the questions accordingly.
    if (personality === "hero") {
    // If the user selects "hero" the question array is filtered to include only questions with the personalityType of 'hero'.
    filteredQuestions = questions.filter(question => question.personalityType === 'hero');
    console.log(filteredQuestions);
    console.log(personality);
    } else if (personality === "villain") {
    // If the user selects "hero" the question array is filtered to include only questions with the personalityType of 'hero'.
    filteredQuestions = questions.filter(question => question.personalityType === 'villain');
    }

        // Call the nextQuestion function to display the first question from the filteredQuestions array.
        nextQuestion(filteredQuestions, 0);

    $('.ans-btn').prop('disabled', true); //Prevent multiple button clicks
    $(this).addClass("selected"); // add selected class to users choice.
});

//Commonly used functions--------------------------------------------------------------------------

// Function to display the title, current question and background image.
function displayQuestion (question) { 
    // use jQuery .text() method to set text content of question-box element to the title and text of first question
    $('#title').text(question.title);
    $('#question-box').text(question.question);
    // Set the background image of the body
    $('body').css('background-image', 'url("' + question.image + '")');
    // Display current quesiton number
    $('#currentQuestion').text(question.questionNumber + " of 8");
}

// Function to dynamically create answer buttons based on the current question.
function generateAnswerButtons(question, buttonClass, attribute) { 
    // Loop through the answers and create button elements using forEach() with arrow function
    question.answers.forEach(answer => {
        // Create a button element with jQuery
        const button = $('<button></button>');
        // Set button text
        button.text(answer.text);
        // Check if the current question is not the first question. THe first question has button class 'ans-btn'
        if (question.questionNumber !== 1) {
            // Determine the button class based on the question's personality type using ternary operator
            buttonClass = question.personalityType === 'hero' ? 'hero-ans-btn' : 'villain-ans-btn';
        }
        // Add the determined button class to the button, which affects its styling and event handling.
        button.addClass(buttonClass);
        // Add personality/character attribute property to the button
        button.data(attribute, answer[attribute]);
        // Append the button to the answerButtonsElement
        answerButtonsElement.append(button);
    });
}

// Function to update the characters score
function updateCharacterScore(character) {
    switch (character) {
        case "Batman":
            batman++;
            console.log("Batman score:", batman);
            break;
        case "Robin":
            robin++;
            console.log("Robin score:", robin);
            break;
        case "Red Hood":
            redHood++;
            console.log("Red Hood score:", redHood);
            break;
        case "Batgirl":
            batgirl++;
            console.log("Batgirl score:", batgirl);
            break;
        case "The Joker":
            theJoker++;
            console.log("The Joker score:", theJoker);
            break;
        case "The Penguin":
            thePenguin++;
            console.log("The Penguin score:", thePenguin);
            break;
        case "Bane":
            bane++;
            console.log("Bane score:", bane);
            break;
        default:
            catwoman++;
            console.log("Catwoman score:", catwoman);
    }
};


//START GAME--------------------------------------------------------------------------
  
// Starts the quiz by transitioning from the intro to the first question.
function startGame() {  
    // Fade out the main content to transition into the quiz section.
    mainContainer.fadeOut(2000, function() {   
        // Hide the introduction and show the quiz container for the user to start answering questions.
        $("#intro").addClass("hidden");
        $("#game-container").removeClass("hidden");
        mainContainer.fadeIn(1000); // Fade in the main container
        // Call showFirstQuestion function to display the first question
        showFirstQuestion(0);
    });
}

//Show Branch Question--------------------------------------------------------------------------
// Displays the first question where the user chooses between hero and villain paths.
function showFirstQuestion() { 
    const question = questions[0]; // store the current question
    displayQuestion(question);
    generateAnswerButtons(question, 'ans-btn', 'personality'); // For branch questions
};

//Start Hero/villain Path--------------------------------------------------------------------------

// Function to display the next question in the quiz
function nextQuestion(filteredQuestions, currentIndex, buttonClass) {
    // Fade out the main container before displaying the next question
    mainContainer.fadeOut(1000, function() {
        // Retrieve the current question based on the currentIndex
        const question = filteredQuestions[currentIndex];

        // Display the current question on the screen
        displayQuestion(question);

        // Clear any existing answer buttons before generating new ones
        answerButtonsElement.empty();

        // Dynamically create answer buttons for the current question
        generateAnswerButtons(question, buttonClass, 'character');

        // Remove any previous click event handlers to prevent multiple triggers and attach a new click event handler to handle answer selection
        $('#answer-box').off('click').on('click', '.hero-ans-btn, .villain-ans-btn', function() {
            const character = $(this).data("character"); // Retrieve the 'character' data attribute from the clicked button to update the character's score.
            updateCharacterScore(character);
            $('.hero-ans-btn, .villain-ans-btn').prop('disabled', true); // Disable all answer buttons to prevent multiple selections
            $(this).addClass("selected"); // Adds a selected class to the user's choice for styling.
            
            // Increment the currentIndex to move to the next question
            currentIndex++;
            // Check if there are more questions to display
            if (currentIndex < filteredQuestions.length) {
                // If there are more questions, display the next one
                nextQuestion(filteredQuestions, currentIndex, buttonClass);
            } else {
                // If there are no more questions, proceed to the end of the quiz
                revelation();
            }
        });     
    });

    // Fade in the main container to show the next question
    mainContainer.fadeIn(1000);
}

//Revelation Function--------------------------------------------------------------------------
// After all questions have been asked display the revelation
function revelation() {
    // Fade out the main container
    mainContainer.fadeOut(1000, function() {
    // hide game-container (questions and answers)
    $("#game-container").addClass("hidden");
    // show revelation
    $("#revelation-container").removeClass("hidden");
    // use if statement to show either hero or villain revelation based on user personality. 
    if (personality === "hero") {
        $(".hero-revelation").removeClass("hidden");
        $('body').css('background-image', 'url("assets/images/hero-revelation-background.webp")');
    } else {
        $(".villain-revelation").removeClass("hidden");
        $('body').css('background-image', 'url("assets/images/villain-revelation-background.webp")');
    }
    // Fade main back in
    mainContainer.fadeIn(1000);
    });

    score();
}

// Calculate users character based on their quiz score.
function score() { 
    // assign the highest scoring character to maxScore variable.
    let maxScore = Math.max(batman, robin, redHood, batgirl,theJoker, thePenguin, bane, catwoman);
    // Determine the charcter the users most aligns with assign, the userCharacter varible that character.
    if (maxScore === batman) {
        userCharacter = "Batman";
    } else if (maxScore === robin) {
        userCharacter = "Robin";
    } else if (maxScore === redHood) {
        userCharacter = "Red Hood";
    } else if (maxScore === batgirl) {
        userCharacter = "Batgirl";
    } else if (maxScore === theJoker) {
        userCharacter = "The Joker"; 
    } else if (maxScore === thePenguin) {
        userCharacter = "The Penguin";
    } else if (maxScore === bane) {
        userCharacter = "Bane";
    } else if (maxScore === catwoman) {
        userCharacter = "Catwoman";
    }
}

// Character Reveal--------------------------------------------------------------------------

$(".reveal-btn").on("click", function() { // Event listener to reveal the user's character when the reveal button is clicked
    displayResult(); // Call the displayResult function to show the user's character
});

// Function to display the final result to the user.
function displayResult() { 
    mainContainer.fadeOut(2000, function() { 
        $("#revelation-container").addClass("hidden");  
        $("#results").removeClass("hidden");

        switch (userCharacter) {
            case "Batman":
                $('h1.character-reveal').text('You Are Batman');
                $('p.character-bio').text("You are Gotham's legendary Dark Knight. With unparalleled detective skills and unwavering determination, you tirelessly fight against the city's criminal underworld. Your commitment to justice, coupled with your strategic brilliance and advanced technology, strikes fear into the hearts of evildoers. You embody the symbol of hope for Gotham, standing as its protector against the forces of darkness");
                $('img.character-headshot').attr('src', 'assets/images/batman-headshot.webp').attr('alt', 'Batman headshot');
                break;
            case "Robin":
                $('h1.character-reveal').text('You Are Robin');
                $('p.character-bio').text("You are the loyal and resourceful partner of Batman. With a strong sense of justice and a desire to make a difference, you navigate the streets of Gotham alongside the Dark Knight. Your agility, intellect, and unwavering dedication to the cause make you a valuable asset in the fight against crime. You bring a youthful energy and optimism to the hero's journey, inspiring hope in the city's darkest hours.");
                $('img.character-headshot').attr('src', 'assets/images/robin-headshot.webp').attr('alt', 'Robins headshot');
                break;
            case "Red Hood":
                $('h1.character-reveal').text('You Are Red Hood');
                $('p.character-bio').text("You are Gotham's conflicted anti-hero. Driven by a desire for vengeance and redemption, you walk a fine line between justice and revenge. Your combat skills and willingness to do whatever it takes to achieve your goals make you a formidable force against the city's criminals. Despite your troubled past, you strive to protect the innocent and bring a sense of justice to Gotham's streets.");
                $('img.character-headshot').attr('src', 'assets/images/redhood-headshot.webp').attr('alt', 'Red Hoods headshot');
                break;
            case "Batgirl":
                $('h1.character-reveal').text('You Are Batgirl');
                $('p.character-bio').text("Gotham's agile and resourceful vigilante. With a keen intellect and unmatched martial arts prowess, you fight alongside Batman to protect the city from harm. Your determination, bravery, and technological expertise make you a vital member of the Bat-family. Despite facing adversity and challenges, you remain steadfast in your mission to make Gotham a safer place for all its citizens.");
                $('img.character-headshot').attr('src', 'assets/images/batgirl-headshot.webp').attr('alt', 'Batgirl headshot');
                break;
            case "The Joker":
                $('h1.character-reveal').text('You Are The Joker');
                $('p.character-bio').text("Gotham's infamous agent of chaos. With a twisted sense of humor and a penchant for mayhem, you revel in causing chaos and confusion wherever you go. Your unpredictable nature and disregard for consequences make you a formidable adversary for Gotham's heroes, as you delight in pushing the city to its limits.");
                $('img.character-headshot').attr('src', 'assets/images/joker-headshot.webp').attr('alt', 'The Jokers headshot');
                break;
            case "The Penguin":
                $('h1.character-reveal').text('You Are The Penguin');
                $('p.character-bio').text("Gotham's cunning and resourceful crime lord. With a sharp mind and a knack for business, you thrive in the underworld of Gotham, using your wealth and influence to manipulate those around you. Your ability to adapt to any situation and exploit opportunities to your advantage makes you a force to be reckoned with, as you build your empire one scheme at a time.");
                $('img.character-headshot').attr('src', 'assets/images/penguin-headshot.webp').attr('alt', 'The Penguins headshot');
                break;
            case "Bane":
                $('h1.character-reveal').text('You Are Bane');
                $('p.character-bio').text("Gotham's ruthless and formidable mercenary. With brute strength and tactical genius, you seek to impose your will upon the city, crushing anyone who dares to oppose you. Your unwavering determination and sheer physical power make you a force of nature, as you seek to establish yourself as Gotham's ultimate ruler through fear and intimidation.");
                $('img.character-headshot').attr('src', 'assets/images/bane-headshot.webp').attr('alt', 'Banes headshot');
                break;
            case "Catwoman":
                $('h1.character-reveal').text('You Are Catwoman');
                $('p.character-bio').text("Gotham's agile and elusive thief. With a code of honour all your own, you walk the fine line between hero and villain, using your skills to survive in Gotham's dangerous streets. Your quick wit and cunning make you a formidable adversary, as you navigate the shadows of Gotham with grace and style, always looking out for yourself above all else.");
                $('img.character-headshot').attr('src', 'assets/images/catwoman-headshot.webp').attr('alt', 'Catwomans headshot');
                break;
            default:
                // Handle an unexpected character value
                console.log('Unexpected character:', userCharacter);
        }

        mainContainer.fadeIn(1000); // Fade in the main container after displaying the result
    });
}


//Game Reset--------------------------------------------------------------------------
 // Event listerner for refresh button to reset the quiz.
$("#game-reset").on("click", function() {
    window.location.reload();
});

//Voiceover--------------------------------------------------------------------------
// from Alon Zilberman on stackflow (See README)
// Function to toggle voiceover playback.
document.getElementById("play-pause").addEventListener("click", function(){ // Event listern to play voiceover/narration
    var audio = document.getElementById('voiceover');
    if(this.className == 'is-playing'){
        this.className = "is-paused";
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
const questions = [
    {
        title: "Chapter 1: The Choice",
        questionNumber: 1,
        question: "As the figure approaches, you see a glint of concern in their eyes. They offer you a hand and ask, 'Are you alright? You seem lost.' How do you respond?",
        image: "assets/images/chapter-1-the-choice.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Accept their help gratefully, hoping they can shed light on your situation",
                personality: "hero"
            },
            {
                answerNumber: 2,
                text: "Firmly reject the offer, wary of trusting strangers and determined to rely solely on your own cunning and resources.",
                personality: "villain"
            }
        ]
    },
    {
        personalityType: "Hero",
        title: "Chapter 2: Embracing Your Past",
        personalityType: "hero",
        questionNumber: 2,
        question: "You accept the stranger's help and follow them to a hidden room filled with newspaper clippings, photographs, and documents. They reveal that you were once a renowned detective, but your memory loss has left you vulnerable. How do you react to this revelation?",
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
        personalityType: "Hero",
        title: "Chapter 3: Unravelling the Mystery",
        questionNumber: 3,
        personalityType: "hero",
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
        personalityType: "Hero",
        title: "Chapter 4: The Water Supply Threat",
        questionNumber: 4,
        personalityType: "hero",
        question: "While investigating, you overhear a conversation revealing that a criminal gang plans to poison Gotham's water supply. How do you choose to respond?",
        image: "assets/images/hero-chapter-4.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Immediately mobilise your resources to stop the poisoning, utilising your network and investigative skills to uncover the gang's operation and put an end to their scheme.",
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
                text: "Use any force necessary to thwart their plans.",
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
        personalityType: "Hero",
        title: "Chapter 5: Infiltrating the Enemy Hideout",
        questionNumber: 5,
        personalityType: "hero",
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
        personalityType: "Hero",
        title: "Chapter 6: Rescuing the Hostages",
        questionNumber: 6,
        personalityType: "hero",
        question: "While investigating the hideout, you discover innocent hostages being held captive by the criminals. How do you proceed?",
        image: "assets/images/hero-chapter-6.webp",
        answers: [
            {
                answerNumber: 1,
                text: "Use your agility and stealth to navigate the hideout and rescue the hostages undetected.",
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
                text: "Take decisive action to neutralise the threat and free the hostages, accepting that there maybe collaleral damage.",
                score: 2,
                personality: "Hero",
                character: "Red Hood"
            },
            {
                answerNumber: 4,
                text: "Utilize advanced hacking skills to remotely access the hideout's security systems, disabling alarms and unlocking doors to facilitate the hostages' rescue.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        personalityType: "Hero",
        title: "Chapter 7: Escaping the Villain's Lair",
        questionNumber: 7,
        personalityType: "hero",
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
        personalityType: "Hero",
        title: "Chapter 8: The Final Confrontation",
        questionNumber: 8,
        personalityType: "hero",
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
                text: "Hack into the leader's security systems, gathering intel and weakening their defenses before staging a calculated ambush.",
                score: 1,
                personality: "Hero",
                character: "Batgirl"
            }
        ]
    },
    {
        personalityType: "villain",
        title: "Chapter 2: The Rise of Darkness",
        questionNumber: 2,
        question: "As you emerge from the shadows of Gotham's underworld, you realise the potential for power and control that lies within your grasp. How do you begin your journey to ascendancy?",
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
        personalityType: "villain",
        title: "Chapter 3: Hostage Crisis",
        questionNumber: 3,
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
        personalityType: "villain",
        title: "Chapter 4: Evading Capture",
        questionNumber: 4,
        question: "As law enforcement closes in on your location, how do you evade capture?",
        image: "assets/images/villain-chapter-4.webp",
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
        personalityType: "villain",
        title: "Chapter 5: Reign of Terror",
        questionNumber: 5,
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
        personalityType: "villain",
        title: "Chapter 6: Final Showdown",
        questionNumber: 6,
        question: "As the heroes rally to challenge your reign of terror, you prepare for a final confrontation to determine the fate of Gotham. How do you intend to emerge victorious and solidify your legacy as the city's ultimate villain?",
        image: "assets/images/villain-chapter-6.webp",
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
        personalityType: "villain",
        title: "Chapter 7: Subjugation",
        questionNumber: 7,
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
        personalityType: "villain",
        title: "Chapter 8: Eternal Darkness",
        questionNumber: 8,
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
                text: "Enforce your rule through ruthless displays of power, making examples of those who dare defy your supremacy.",
                personality: "Villain",
                character: "The Joker"
            }
        ]
    }
];
