/*jshint esversion: 6 */

// This JavaScript file drives the interactivity of the "Gotham's Dark Decisions" quiz.
// It handles user inputs, quiz logic, question navigation, and computes the final character outcome.
// The quiz questions are included in arrays towards the end of this file. 

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
let userCharacter;
let personality;
let startBlocked = false;
let filteredQuestions = [];


//Commonly used functions--------------------------------------------------------------------------
function fadeOutEffect(element, duration, callback) { // Transition effect
    element.fadeOut(duration, function() {
     callback (); 
    });
}

function fadeInEffect(element, duration) { // Transition effect
    element.fadeIn(duration, function() { 
    });
}

/**
 Displays the content of the current quiz question on the quiz.
 This function updates the question title, question text, and the background image bassed on the passed object.
 based on the passed question object. It also updates the display of the current
 question number.
*/
function displayQuestion (question) { 
    $('#title').text(question.title); // Update the text content of the question title element.
    $('#question-box').text(question.question); // Update the text content of the question box element with the current question's text.
    $('body').css('background-image', 'url("' + question.image + '")'); // Update the background image of the body element to the current question's image.
    $('#currentQuestion').text(question.questionNumber + " of 8"); // Update the display of the current question number.
}

/**
 Generates answer buttons dynamically for the current quiz question and appends them to the answer container.
 The function dynamically sets the text, class, and  data attributes for each button based on the provided question details.
 */
function generateAnswerButtons(question, buttonClass, attribute) { 
    question.answers.forEach(answer => { // Iterate over the array of answers within the question object to create each button.
        const button = $('<button></button>'); 
        button.text(answer.text); // Set the button's text content to the current answer's text.
        /* 
        Check if the current question is not the first question. determine the button class based on the questions personality type.
        The first question uses the 'ans-btn' class
        */
        if (question.questionNumber !== 1) {
            buttonClass = question.personalityType === 'hero' ? 'hero-ans-btn' : 'villain-ans-btn';
        }
        button.addClass(buttonClass); // Apply a class to style the button based on whether the question is for a hero or villain.
        // Store the answers associated personality or character in a data attribute on the button.
        button.data(attribute, answer[attribute]); 
        answerButtonsElement.append(button); 
    });
}

//START GAME--------------------------------------------------------------------------
// fadeIn transition to quiz introduction, enhancing user experience with a smooth start.
mainContainer.fadeIn(2500);  

$("#start-btn").on("click", function() { // Begin the quiz when the start button is clicked.
    if (startBlocked == false){  // prevent multiple clicks of start button
        startBlocked = true;  
        startGame(); 
    }
});

// Initializes the quiz by transitioning from the introductory section to the first question.
function startGame() {  
    fadeOutEffect (mainContainer, 2000, function() {   // Transition the main content out to set the stage for the quiz. 
        // Switch from the intro view to the quiz view.
        $("#intro").addClass("hidden");
        $("#game-container").removeClass("hidden");
        // Ensure a smooth transition into the quiz content.
        fadeInEffect (mainContainer, 1000); 
        showFirstQuestion(0); // Load the first question to start the quiz experience.
    });
}

//Show Branch Question / Q.1.--------------------------------------------------------------------------
/**
Displays the first question of the quiz, setting up the initial interaction for the user.
This involves presenting the question and generating the corresponding answer buttons.
 */
function showFirstQuestion() { 
    const question = questions[0]; // Retrieve the initial question from the questions array.
    displayQuestion(question); // Utilise the displayQuestion function to render the question details.
    // Generate answer buttons for the first question, establishing the interactive elements for the user.
    generateAnswerButtons(question, 'ans-btn', 'personality'); 
}

// Set up an event listener to determine the user's chosen path (hero or villain) after the first question.
$('#answer-box').on('click', '.ans-btn', function() {
    // Retrieve and store the personality type (hero or villain) from the clicked answer button's data attribute.
    personality = $(this).data("personality"); 
    checkPersonality(personality); // Call the checkPersonality function to filter subsequent questions based on the chosen personality.
    $('.ans-btn').prop('disabled', true); // Disable all answer buttons to prevent changing the answer once one has been selected.
    $(this).addClass("selected"); // Highlight the selected answer for visual confirmation by adding a 'selected' class.
});

/**
 Filters the quiz questions based on the user's chosen personality type (hero or villain).
 This function determines which set of questions will be presented to the user for the remainder of the quiz.
 */
function checkPersonality(personality) {
    // Filter questions based on the selected personality
    if (personality === "hero") {
        // Filter the questions array to include only those designated for the 'hero' pathway.
        filteredQuestions = questions.filter(question => question.personalityType === 'hero');
        console.log(filteredQuestions);
        console.log(personality);
        } else if (personality === "villain") {
        // Filter for the 'villain' pathway if that's the chosen personality.
        filteredQuestions = questions.filter(question => question.personalityType === 'villain');
        console.log(filteredQuestions);
        console.log(personality);
        }
    nextQuestion(filteredQuestions, 0);  // Proceed to the next question of the filtered questions
}

//Start Hero/villain Path--------------------------------------------------------------------------

/**
Advances the quiz to the next question, updating the quiz to reflect the new question's content.
It handles the transition effects, updates the displayed question, and sets up the necessary event handlers for the new set of answer buttons.
 */
function nextQuestion(filteredQuestions, currentIndex, buttonClass) {
    fadeOutEffect (mainContainer, 2000, function() { // Transition out the current content to prepare for the new question.
        const question = filteredQuestions[currentIndex]; // After fading out, retrieve and display the next question.
        // Display the current question on the screen
        displayQuestion(question); // Update the quiz with the new questions details.
        answerButtonsElement.empty(); // Clear previous answer buttons to make room for the new set.
        // Dynamically create answer buttons for the current question
        generateAnswerButtons(question, buttonClass, 'character'); // Generate new answer buttons that correspond to the current question.
        // Set up event handlers for the new answer buttons to handle user interaction.
        $('#answer-box').off('click').on('click', '.hero-ans-btn, .villain-ans-btn', function() {
            const character = $(this).data("character"); // Extract the character associated with the selected answer.
            updateCharacterScore(character); // Update the score based on the users selection.
            $('.hero-ans-btn, .villain-ans-btn').prop('disabled', true); // Prevent further interactions with the buttons.
            $(this).addClass("selected"); // Visually indicate the selected answer.
            incrementQuestions(currentIndex, buttonClass); // Prepare for the next question or conclude the quiz based on the current progress.
        });     
    });
    fadeInEffect (mainContainer, 1000); // Fade in the main container
}

/**
Advances the quiz to the next question or concludes the quiz if all questions have been answered.
It increments the current question index and checks if there are more questions to display. If there are,
 it calls nextQuestion with the new index. If not, it triggers the quiz conclusion process.
*/
function incrementQuestions(currentIndex, buttonClass) { // function advances quiz to next question based on current index, or end of quiz.
    currentIndex++; // Proceed to the next question index.
    if (currentIndex < filteredQuestions.length) { // There are more questions to display.
        nextQuestion(filteredQuestions, currentIndex, buttonClass);
    } else { // No more questions are left; trigger the end-of-quiz logic.
        revelation();
        console.log("going to revelation");
    }
}

/**
Increments the score of the specified character based on the users answer selection.
This function is crucial for tracking how the user's choices align with different characters,
ultimately determining the character outcome at the end of the quiz.
*/
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
}

//Revelation Function--------------------------------------------------------------------------
/**
Triggers the end-of-quiz revelation sequence, displaying the final outcome based on the user's choices.
This function transitions the view from the quiz to the result, showing either a hero or villain revelation
 */
function revelation() {
    fadeOutEffect (mainContainer, 2000, function() { // Begin the transition by fading out the main quiz content.
    $("#game-container").addClass("hidden"); // Hide the quiz content to prepare for the revelation display.
    $("#revelation-container").removeClass("hidden"); // Unhide the container that will display the quiz outcome.
    // Determine and display the final outcome based on the user's personality choice.
    if (personality === "hero") { // Display the hero's revelation content and background if the user followed the hero path.
        $(".hero-revelation").removeClass("hidden");
        $('body').css('background-image', 'url("assets/images/hero-revelation-background.webp")');
    } else { // Display the villain's revelation content and background if the user followed the villain path.
        $(".villain-revelation").removeClass("hidden");
        $('body').css('background-image', 'url("assets/images/villain-revelation-background.webp")');
    }
    fadeInEffect (mainContainer, 1000); // Fade the revelation box into view.
    });
}

/**
 Sets up an event listener for the "reveal" button click, initiating the scoring and result display process.
 When the user clicks the reveal button, the quiz score is calculated, and the corresponding character result
is displayed, concluding the quiz experience.
 */
$(".reveal-btn").on("click", function() { 
    score(); // Calculate the user's quiz score and determine their character.
    displayResult(); // Display the determined character result to the user.
});

/**
 Calculates the users quiz score and determines their character based on the highest score achieved.
Handles ties by random selection if necessary.
 */
function score() { 
    // Find the maximum score among all characters to identify the leading character(s).
    let maxScore = Math.max(batman, robin, redHood, batgirl,theJoker, thePenguin, bane, catwoman);
    let topScorers = [];
    // Check each character's score against maxScore and populate the topScorers array accordingly.
    if (batman === maxScore) {
        topScorers.push("Batman");
    } if (robin === maxScore) {
        topScorers.push("Robin");
    } if (redHood === maxScore) {
        topScorers.push("Red Hood");
    } if (batgirl === maxScore) {
        topScorers.push("Batgirl");
    } if (theJoker === maxScore) {
        topScorers.push("The Joker");
    } if (thePenguin === maxScore) {
        topScorers.push("The Penguin");
    } if (bane === maxScore) {
        topScorers.push("Bane");
    } if (catwoman === maxScore) {
        topScorers.push("Catwoman");
    }
    console.log("Top Scorers: ", topScorers);

    // Assign the character to userCharacter, resolving ties by random selection if necessary.
    if (topScorers.length === 1) {
        // Directly assign the character if there's a single top scorer.
        userCharacter = topScorers[0];
        console.log(userCharacter);
    // in the event of a tiebreak and more than one character is stored in the topScorers array
    } else { // If there's a tie, randomly select one of the top scorers as the users character.
        let randomCharacter = Math.floor(Math.random() * topScorers.length);
        userCharacter = topScorers[randomCharacter];
        console.log("Randomly selected character is", userCharacter);
    }
}

// Character Reveal--------------------------------------------------------------------------
/**
Displays the final character result to the user based on the quiz scores.
This function transitions the view to reveal the character that aligns with the users choices,
showing a personalised message, character bio, and image.
 */
function displayResult() { 
    fadeOutEffect (mainContainer, 2000, function() { // Transition out the current content to prepare for revealing the quiz result.
        // Hide the current quiz content to switch to the result display.
        $("#revelation-container").addClass("hidden");  
        $("#results").removeClass("hidden");
        switch (userCharacter) { // Determine and display the result based on the user's character outcome.
            case "Batman": // Set the content for Batman, including text and image.
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
            default:
                $('h1.character-reveal').text('You Are Catwoman');
                $('p.character-bio').text("Gotham's agile and elusive thief. With a code of honour all your own, you walk the fine line between hero and villain, using your skills to survive in Gotham's dangerous streets. Your quick wit and cunning make you a formidable adversary, as you navigate the shadows of Gotham with grace and style, always looking out for yourself above all else.");
                $('img.character-headshot').attr('src', 'assets/images/catwoman-headshot.webp').attr('alt', 'Catwomans headshot');
                break;
        }
        fadeInEffect (mainContainer, 1000); // Fade in the result to smoothly transition to the reveal.
    });
}

// Set up an event listener on the "game-reset" button to reload the page, effectively resetting the quiz.
 $("#game-reset").on("click", function() { // Reload the current page to start the quiz over.
    window.location.reload();
});

// Other Functions--------------------------------------------------------------------------
// from Alon Zilberman on stackflow (See README)
/**
Toggles the voiceover playback state when the play-pause button is clicked.
The function changes the button's appearance based on the audio's playing state
and controls the playback of the voiceover audio.
 */
document.getElementById("play-pause").addEventListener("click", function(){ // Add an event listener to the play-pause button for click events.
    var audio = document.getElementById('voiceover'); // Access the audio element.
    // Toggle the play/pause state based on the current class of the button.
    if(this.className == 'is-playing'){
        // If audio is playing, pause it and update button appearance.
        this.className = "is-paused";
        this.textContent = "▶"; // Set to play symbol.
        audio.pause(); // Pause the audio.
    } else {  // If audio is paused, play it and update button appearance.
        this.className = "is-playing"; 
        this.textContent = "❚❚"; // Set to pause symbol.
        audio.play(); // Play the audio.
    }
});
// Set the initial content to the play symbol when the page loads.
document.getElementById("play-pause").textContent = "▶";

//QUESTIONS--------------------------------------------------------------------------
/**
Array of questions for the quiz, each with a structure that includes the question's title, 
question number, text, associated image, and possible answers.
Each answer has an associated number, text content, and a personality type to help 
determine the user's path in the quiz based on their selections.
 */
const questions = [
    {
        title: "Chapter 1: The Choice",
        questionNumber: 1,
        question: "As the figure approaches, you see a glint of concern in their eyes. They offer you a hand and ask, 'Are you alright? You seem lost.' How do you respond?",
        image: "assets/images/chapter-1-the-choice.webp",
        answers: [
            {
                text: "Accept their help gratefully, hoping they can shed light on your situation",
                personality: "hero"
            },
            {
                text: "Firmly reject the offer, wary of trusting strangers and determined to rely solely on your own cunning and resources.",
                personality: "villain"
            }
        ]
    },
    {
        title: "Chapter 2: Embracing Your Past",
        personalityType: "hero",
        questionNumber: 2,
        question: "You accept the stranger's help and follow them to a hidden room filled with newspaper clippings, photographs, and documents. They reveal that you were once a renowned detective, but your memory loss has left you vulnerable. How do you react to this revelation?",
        image: "assets/images/hero-chapter-2.webp",
        answers: [
            {
                text: "Embrace your past and begin piecing together the clues to uncover the truth.",
                character: "Batman"
            },
            {
                text: "Seek further proof before fully accepting your identity as a detective.",
                character: "Robin"
            },
            {
                text: "Express gratitude for the stranger's help but make it clear that you work alone, preferring to handle matters your own way.",
                character: "Red Hood"
            },
            {
                text: "Remain skeptical and continue searching for answers on your own.",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 3: Unravelling the Mystery",
        personalityType: "hero",
        questionNumber: 3,
        question: "Unraveling the Mystery: As you delve deeper into the mystery of your identity, you uncover a trail of clues leading to a notorious criminal organisation operating in the shadows of Gotham. How do you choose to confront this threat?",
        image: "assets/images/hero-chapter-3.webp",
        answers: [
            {
                text: "Gather evidence and build a case against the organisation, using your intellect and cunning to outsmart them.",
                character: "Batman"
            },
            {
                text: "Confront the organisation head-on, using your combat skills to dismantle them and put an end to their criminal activities.",
                character: "Red Hood"
            },
            {
                text: "Seek assistance from trusted allies or other heroes to take down the criminal organisation.",
                character: "Robin"
            },
            {
                text: "Infiltrate the organisation from within, using stealth and deception to dismantle it from the inside.",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 4: The Water Supply Threat",
        questionNumber: 4,
        personalityType: "hero",
        question: "While investigating, you overhear a conversation revealing that a criminal gang plans to poison Gotham's water supply. How do you choose to respond?",
        image: "assets/images/hero-chapter-4.webp",
        answers: [
            {
                text: "Immediately mobilise your resources to stop the poisoning, utilising your network and investigative skills to uncover the gang's operation and put an end to their scheme.",
                character: "Batman"
            },
            {
                text: "Gather evidence to expose the plot and rally public support against the criminals.",
                character: "Robin"
            },
            {
                text: "Use any force necessary to thwart their plans.",
                character: "Red Hood"
            },
            {
                text: "Utilise your technological expertise to hack into the gang's communication channels and disrupt their operation.",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 5: Infiltrating the Enemy Hideout",
        questionNumber: 5,
        personalityType: "hero",
        question: "You learn the location of the criminal organisation's hideout and must decide how to approach it. How do you proceed?",
        image: "assets/images/hero-chapter-5.webp",
        answers: [
            {
                text: "Conduct surveillance to gather information and assess the enemy's strength before taking action.",
                character: "Batman"
            },
            {
                text: "Formulate a strategic plan to infiltrate the hideout and neutralise the threat.",
                character: "Robin"
            },
            {
                text: "Launch a surprise attack on the hideout, catching the criminals off guard.",
                character: "Red Hood"
            },
            {
                text: "Utilise your agility and stealth to sneak into the hideout undetected.",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 6: Rescuing the Hostages",
        questionNumber: 6,
        personalityType: "hero",
        question: "While investigating the hideout, you discover innocent hostages being held captive by the criminals. How do you proceed?",
        image: "assets/images/hero-chapter-6.webp",
        answers: [
            {
                text: "Use your agility and stealth to navigate the hideout and rescue the hostages undetected.",
                character: "Red Hood"
            },
            {
                text: "Coordinate with your allies to execute a swift and efficient rescue operation.",
                character: "Robin"
            },
            {
                text: "Take decisive action to neutralise the threat and free the hostages, accepting that there maybe collaleral damage.",
                character: "Red Hood"
            },
            {
                text: "Utilize advanced hacking skills to remotely access the hideout's security systems, disabling alarms and unlocking doors to facilitate the hostages' rescue.",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 7: Escaping the Villain's Lair",
        questionNumber: 7,
        personalityType: "hero",
        image: "assets/images/hero-chapter-7.webp",
        question: "After freeing the hostages you are captured by the villainous mastermind, you find yourself imprisoned in their elaborate and heavily guarded lair. How do you plan your daring escape?",
        answers: [
            {
                text: "Use your keen detective skills to uncover weaknesses in the lair's security system and exploit them to break free.",
                character: "Batman"
            },
            {
                text: "Overpower your guards with swift and decisive combat techniques, seizing their weapons and using them to fight your way out.",
                character: "Red Hood"
            },
            {
                text: "Create a diversion by sabotaging the lair's infrastructure, causing chaos and confusion that allows you to slip away unnoticed.",
                character: "Robin"
            },
            {
                text: "Utilise your acrobatic agility to navigate the perilous obstacles of the lair, finding hidden passages and escape routes to freedom.",
                character: "Batgirl"
            }
        ]
    },
    {
        title: "Chapter 8: The Final Confrontation",
        questionNumber: 8,
        personalityType: "hero",
        image: "assets/images/hero-chapter-8.webp",
        question: "After escaping you face the leader of the criminal organisation in a final showdown. How do you approach this dangerous encounter?",
        answers: [
            {
                text: "Utilise your intellect and strategic planning to outwit the leader and bring them to justice.",
                character: "Batman"
            },
            {
                text: "Engage in a physical battle, determined to defeat the leader and end their reign of terror.",
                character: "Red Hood"
            },
            {
                text: "Call upon your allies for support, knowing that together, you can overcome any challenge.",
                character: "Robin"
            },
            {
                text: "Hack into the leader's security systems, gathering intel and weakening their defenses before staging a calculated ambush.",
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
                text: "Manipulate and deceive those around you, using their trust to further your own ambitions.",
                character: "The Joker"
            },
            {
                text: "Assert dominance through displays of force and violence, ensuring that none dare oppose you.",
                character: "Bane"
            },
            {
                text: "Form alliances with other emerging villains, pooling resources to strengthen your foothold in the city.",
                character: "The Penguin"
            },
            {
                text: "Utilise your cunning and intellect to outmaneuver rivals, securing your position as a rising force in Gotham's criminal hierarchy.",
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
                text: "Threaten to harm the hostages unless your demands are met, instilling fear in both the authorities and the public.",
                character: "The Penguin"
            },
            {
                text: "Publicly showcase the hostages as a display of your power, daring anyone to challenge your authority.",
                character: "Bane"
            },
            {
                text: "Use the hostages as leverage to negotiate favourable terms with the authorities, ensuring that your interests are protected.",
                character: "The Joker"
            },
            {
                text: "Exploit the emotional connection between the hostages and the public to manipulate public opinion and garner support for your cause.",
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
                text: "Use the hostages as human shields, daring the authorities to risk innocent lives in their pursuit of justice.",
                character: "The Penguin"
            },
            {
                text: "Stage a diversionary tactic to distract the authorities while you quietly slip away with the hostages.",
                character: "Bane"
            },
            {
                text: "Release the hostages unharmed as a sign of goodwill, buying yourself time to plan your next move without drawing unnecessary attention.",
                character: "Catwoman"
            },
            {
                text: "Impersonate a hostage yourself, infiltrating the authorities' ranks to gather intelligence and turn the situation to your advantage.",
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
                text: "Rule through fear and brutality, ensuring that dissenters are swiftly and ruthlessly dealt with.",
                character: "Bane"
            },
            {
                text: "Establish a network of loyal enforcers and minions, enforcing your will through intimidation and violence.",
                character: "The Penguin"
            },
            {
                text: "Exploit the weaknesses and vulnerabilities of Gotham's institutions, corrupting them to serve your own nefarious ends.",
                character: "Catwoman"
            },
            {
                text: "Stay one step ahead of your enemies, using your cunning and intellect to outmaneuver any threats to your reign.",
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
                text: "Unleash chaos and destruction upon the city, disrupting the heroes' plans and plunging Gotham into darkness.",
                character: "The Joker"
            },
            {
                text: "Engage the heroes in a brutal showdown, using your sheer strength and combat prowess to overpower them.",
                character: "Bane"
            },
            {
                text: "Outmaneuver the heroes at every turn, exploiting their weaknesses and vulnerabilities to gain the upper hand.",
                character: "Catwoman"
            },
            {
                text: "Challenge the heroes to a final battle of wits and strategy, pitting your cunning intellect against their unwavering determination.",
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
                text: "Instill fear and obedience among the populace, ensuring that any who dare oppose you are swiftly and mercilessly dealt with.",
                character: "Bane"
            },
            {
                text: "Establish a network of spies and informants, rooting out dissent and rebellion before it can take hold.",
                character: "The Penguin"
            },
            {
                text: "Exploit the city's infrastructure and resources, using them to maintain your grip on power and crush any who would oppose you.",
                character: "Catwoman"
            },
            {
                text: "Stay one step ahead of any potential threats, using your cunning and intellect to thwart any attempts to challenge your rule.",
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
                text: "Crush any who dare oppose you with overwhelming force, ensuring that none dare challenge your authority.",
                character: "Bane"
            },
            {
                text: "Establish a cult of personality around yourself, ensuring that your name strikes fear into the hearts of all who hear it.",
                character: "The Penguin"
            },
            {
                text: "Exploit the fears and insecurities of the populace, using them to maintain control and suppress any who would rebel against you.",
                character: "Catwoman"
            },
            {
                text: "Enforce your rule through ruthless displays of power, making examples of those who dare defy your supremacy.",
                character: "The Joker"
            }
        ]
    }
];
