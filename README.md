# GOTHAM'S DARK DECISIONS

![Gotham's Dark Decisions Am I Responsive Image](add link)

# TABLE OF CONTENTS

- [Gotham's Dark Decisions](#gothams-dark-decisions)
- [TABLE OF CONTENTS](#table-of-contents)
- [INTRODUCTION](#introduction)
  - [Overall Website Aim](#overall-website-aim)
  - [External User Goals](#external-user-goals)
  - [Website Owners Goals](#website-owners-goals)
  - [User Story](#user-story)
- [DESIGN](#design)
  - [Wireframes](#wireframes)
  - [Imagery](#imagery)
  - [Colours](#colours)
  - [Fonts](#fonts)
  - [Accessibility](#accessibility)
  - [Design Feedback](#design-feedback)
- [FEATURES](#features)
  - [Existing Features](#existing-features)
    - [**Navigation:**](#navigation)
    - [**Hero Images:**](#hero-images)
    - [**Landing Page:**](#landing-page)
    - [**Cake of the Month Page:**](#cake-of-the-month-page)
    - [**Baking Tips Page**](#baking-tips-page)
    - [**Sign Up**](#sign-up)
    - [**Footer**](#footer)
    - [**404 Error Page**](#404-error-page)
  - [Future Website Enhancements](#future-website-enhancements)
- [BUGS](#bugs)
  - [Fixed Bugs](#fixed-bugs)
    - [Hero Image Rendering Issue on Mobile Devices](#hero-image-rendering-issue-on-mobile-devices)
    - [Navigation Bar Overlaps Section Headings](#navigation-bar-overlaps-section-headings)
    - [Sign-Up Button Not Visible on Small devices in Landscape Orientation](#sign-up-button-not-visible-on-small-devices-in-landscape-orientation)
  - [Known Bugs (unresolved)](#known-bugs-unresolved)
    - [Hover State Reset After Modal Closure](#hover-state-reset-after-modal-closure)
- [TECHNOLOGY](#technology)
  - [Languages Used:](#languages-used)
  - [Frameworks, Libraries and Programs Used](#frameworks-libraries-and-programs-used)
- [TESTING](#testing)
  - [Manual Testing](#manual-testing)
    - [Feature testing:](#feature-testing)
    - [Browser Compatibility:](#browser-compatibility)
    - [Responsiveness Test:](#responsiveness-test)
  - [Validator Testing](#validator-testing)
    - [HTML](#html)
    - [CSS](#css)
    - [Light House Analysis](#light-house-analysis)
- [DEPLOYMENT](#deployment)
- [CREDITS](#credits)
  - [Content](#content)
  - [Images](#images)
  - [Resources](#resources)
  - [Acknowledgements](#acknowledgements)

# INTRODUCTION


Welcome to Gotham's Dark Decisions - the interactive frontend website that plunges you into the captivating world of Batman. In this immersive experience, users will embark on a thrilling journey of self-discovery, exploring their inner hero or villain through a series of thought-provoking questions.

Gotham's Dark Decisions is more than just a personality quiz - it's a portal to the heart of Gotham City, where shadows reign and the line between good and evil is constantly blurred. Inspired by the rich lore of Batman, this project invites users to explore their own identity within the context of Gotham's complex universe.

To get started with Gotham's Dark Decisions, simply visit the website and click on the "START button. From there, follow the prompts to navigate through the quiz and discover your fate within the Batman universe.


Visit Gotham's Dark Decisions website here [Gothams Dark Decisions](PUT LIVE LINK HERE)

## Experience
  - Choose Your Path: Begin your journey by deciding whether you'll walk the path of a hero or embrace the allure of the darkness as a villain.
  - Interactive Quiz: Answer a series of questions designed to reveal your true nature and uncover your place within the Batman universe.
  - Bat family or Villain: Based on your choices, discover which member of the Bat family you most closely resemble, or which infamous Batman villain shares your traits.
  - Engaging Experience: Immerse yourself in the dark and atmospheric world of Gotham City, brought to life through intriguing questions and stunning visuals.
  


## Overall Website Aim
Gotham's Dark Decisions aims to truly immerse users in the captivating world of Batman, providing an interactive platform for exploring their own heroic or villainous nature. Through engaging and thought-provoking questions, users will embark on a journey of self-discovery within the rich and atmospheric backdrop of Gotham City. The primary goal is to entertain and engage Batman enthusiasts, offering them a unique and immersive experience that celebrates the iconic characters and themes of the Batman universe. Additionally, it aims to provide users with valuable insights into their own personalities and the complex dynamics of heroism and villainy, all while fostering a sense of excitement and intrigue. Whether users are long time fans or newcomers to the world of Batman, Gotham's Dark Decisions invites them to explore, discover, and embrace their inner hero or villain.


## External User Goals
  - Explore Heroic or Villainous Paths: Users are eager to explore their heroic or villainous tendencies through engaging questions and scenarios.
  - Discover Bat family or Villain Identity: Users aim to uncover which member of the Bat family they resemble or which notorious Batman villain shares their traits.
  - Experience the Atmosphere of Gotham: Users seek to immerse themselves in the dark and atmospheric world of Gotham City, enjoying thought-provoking questions and stunning visuals.
  - Engage with the Batman Universe: Users are excited to engage with the iconic characters and themes of the Batman universe.

## Website Owners Goals
  - Build User Engagement: Create a highly engaging and interactive experience for users, encouraging them to spend more time on the website and try out different paths of the quiz.
  - Establish Brand Authority: The site owner aims to position the website as a leading authority on Batman-related personality quizzes, attracting fans and enthusiasts seeking entertainment and insights into the iconic characters and themes.

## Target Audience
  - People who enjoy the Batman franchise.
  - People who enjoy reading graphic novels.
  - People who enjoy taking personality quizzes.

## User Story

- As a first-time user
  - I want to be able to start the quiz by clicking on a "Begin Quiz" button.
  - I want to be presented with a question asking if I prefer to be a hero or a villain in the Batman universe.
  - If I choose "hero," I want to be presented with questions that help determine which member of the Batfamily I am most like.
  - If I choose "villain," I want to be presented with questions that help determine which Batman villain I am most like.
  - I want each question to be presented one at a time, with clear instructions on how to proceed to the next question.
  - I want to be able to select my answer from multiple choice options.
  - I want to see my progress through the quiz, such as how many questions I have answered and how many are remaining.
  - I want to receive my results at the end of the quiz, telling me which member of the Bat-family or which Batman villain I am most like.
  - I want the quiz to be visually appealing and in line with the Batman theme through the use of images, colours, and fonts.
- As a returning user
  - I want to have the option to retake the quiz if I want to try different answers.


# LOGIC OVERVIEW
The Gotham's Dark Decision quiz is a JavaScript-powered frontend website designed to immerse users in the captivating world of Batman. However, to ensure accessibility and comprehension for a broader audience, the code has been translated into plain English. This transparency provides users with insight into the application's functionality and structure without requiring programming knowledge, fostering trust and engagement.


1. Fade In Transition: When the document is ready, the main content fades in gradually over 3 seconds using jQuery.

2. Essential Elements:
   - Key elements such as answer buttons, character scores, and current question indexes are initialized.
   - Initial scores for Batman, Robin, Red Hood, Batgirl, The Joker, The Penguin, Bane, and Catwoman are set to 0.
   - Variables for current hero and villain question indexes, user character, and personality are declared.

3. Start Game Function: Clicking the start button initiates the game by hiding the start button and intro, displaying the game container, and showing the first question.

4. showFirstQuestion Function: Responsible for displaying the first quiz question, allowing users to choose between hero or villain paths.
    - Sets the text of question title and box elements to match the first question.
    - Creates answer buttons for each option, associating personality data with each button.
    - Attaches event listeners to handle user responses, initiating either the hero or villain path.

5. Start Hero/Villain Path Functions: Initiates the hero or villain path based on the user's choice.

6. Next Hero/Villain Question Functions: Displays subsequent hero or villain questions, updates scores based on user answers, and progresses through the quiz.
    - Retrieves the next question object and sets question text elements accordingly. 
    - Clears previous answer buttons and displays new answer options.
    - Handles user responses, incrementing corresponding character scores and advancing to the next question or displaying results.

7. Results Function: Shows the results container, determines the user's character based on score calculations, and displays the corresponding character revelation.
    - Hides the game container and reveals the results container.
    - Displays specific content based on whether the user's personality is hero or villain.
    - Calls the revelation function to determine the user's character. 
    - Appends the user's character result to the webpage.
   
8. Revelation Function: Calculates the user's character based on the highest score and assigns the corresponding character name.
    - Determines the maximum score among character variables and assigns the corresponding character name to the user.

9. Voiceover Function: Toggles the play/pause button for an audio voiceover.

10. Questions: Define arrays containing hero and villain questions, each with titles, questions, and multiple-choice answers, tailored to each character's path. The showFirstQuestion 
    function directs users down either the hero or villain path based on their initial response.
    - If the user's answer leads to the hero path, subsequent questions are drawn from the heroQuestions array.
    - Conversely, if the user's answer leads to the villain path, questions are drawn from the villainQuestions array.
      

# DESIGN

## Wireframes


## Imagery



## Colours


## Fonts


## Accessibility


## Design Feedback

# FEATURES

## Existing Features

## Future Website Enhancements



# BUGS

### Fixed Bugs
### Title: Incorrect Access of Answer Personality Types

#### Issue:
When clicking on an answer button in the first question of the quiz, both hero and villain personality types are being accessed, resulting in incorrect behaviour and progression through the quiz.

#### Description:
During testing of the quiz functionality, it was observed that clicking on an answer button in the first question did not accurately reflect the selected personality type (Hero or villain). Instead of distinguishing between hero and villain personalities, both types were being accessed simultaneously.

#### Expected Behavior:
When clicking on an answer button, only the corresponding personality type (hero or villain) should be accessed and used to determine the next steps in the quiz. This ensures that the quiz accurately reflects the user's choices and progresses accordingly.

#### Steps to Reproduce:
1. Access the quiz application.
2. Start the quiz.
3. Click on an answer button for a question that presents hero or villain personality options.
4. Note that both hero and villain paths are triggered simultaneously.

#### Investigation and Solution:
1. Reviewed the `showFirstQuestion` function responsible for displaying the hero or villain branch question of the quiz quiz.
2. Added jQuery's .data() method to attach the data property "personality" from the array to the button element. 
3. Addeed '$(this).data("personality") to the event listenter  to retreive the value property "personality" from the specfic button element that was clicked and store it in the personality variable to be used in the if/else statement.
4. Tested the modified code using console.log toto verify that only the correct personality type is accessed, resolving the issue of incorrect quiz progression.

#### Result:
The bug related to the incorrect access of answer personality types has been fixed. Now, when clicking an answer button in the first question, only the corresponding hero or villain personality type is accessed, ensuring accurate quiz progression based on user choices.


### Known Bugs (unresolved)




# TECHNOLOGY

## Languages Used:

- HTML: Employed for organising and presenting the site content.
- CSS: Utilised for the styling and layout of the site.

## Frameworks, Libraries and Programs Used
- jQuery: Used for HTML manipulation, event handling and animations/transitions.
- Elevanlabs: AI voice generator used for narrtation in intro. 
- Squoosh: To reduce file size of images.
- Responsinator: Used to assess responsiveness of website across various device sizes.
- Figma: Used to create wireframe images.
- Chrome Dev Tools: For testing responsiveness and fine-tuning.
- W3C: Used for validating HTML and CSS.
- Github pages: Used for hosting the deployed website.
- Gitpod: Used for development as a cloud-based Integrtated Development Environment (IDE).


# TESTING

## Manual Testing


### Feature testing:



### Browser Compatibility:

| Browser Tested | Intended appearance | intended Responsiveness |
| -------------- | :-----------------: | ----------------------: |
| Chrome         |                 |                     |
| Mozilla        |                 |                     |
| Safari         |                 |                     |
| Edge           |                 |                     |

### Responsiveness Test:

| Device Tested  | Site Responsiveness >700px | Site Responsiveness <699px | Renders as Expected |
| -------------- | -------------------------- | -------------------------- | ------------------- |
| iPhone 12      | N/A                        |                  |                |
| iPad 12        |                  |                        |                  |
| Desktop 1024px |                  |                         |                  |

## Validator Testing

### HTML



### CSS



### Light House Analysis



# DEPLOYMENT

To launch the project, GitHub Pages was employed as the deployment platform. The deployment process involves the following steps:

- Navigate to the project repository on GitHub.com.
  Click on 'Settings' located near the top of the page.
- From the menu bar on the left, choose 'Pages.'
- In the 'Source' section, pick the desired branch from the 'Branch' dropdown menu, typically the main branch.
- After making the selection, click 'Save.'
- Successful deployment will be confirmed with a message on a green background stating, "Your site is published at," followed by the corresponding web address.

# CREDITS

### Content

### Images


## Resources
- Code Institute learning material:
  - JavaScript-Specific Core Concepts - JavaScript Functions & Objects 
  - JQuery Library - Writing Less JavaScript  JQuery Introduction 
    - Changing HTML/CSS with jQuery 
    - JQuery Effects
    - The Importance of this
    - Events in JQuery
  - JavaScript-Specific Core Concepts - JavaScript Flow Control
    - if/else statements
    - Multiple Conditions
  - JavaScript-Specific Core Concepts - Working With JavaScript Data Structures

- For help understanding basic quiz functions I used the following resources:
  - [How to Build a Quiz App with Javascript for Beginners](https://hackr.io/blog/how-to-build-a-javascript-quiz-app) by Robert Johns 22nd Feb 2024. [Accessed 1st March 2024].
  - [Build a Quiz App With JavaScript](https://www.youtube.com/watch?v=riDzcEQbX6k&t=1450s) by Web Dev Simplified [Accessed 2nd March].

- The following resources were used to understand JavaScript concepts and create key componenets of functions:
  -  [w3 schools - JavaScript Array forEach()](https://www.w3schools.com/jsref/jsref_foreach.asp) [Accessed 11th March, 2024].

  - [JavaScript forEach()](https://www.programiz.com/javascript/forEach). [Accessed 11th March, 2024].

  - [jQuery .empty()](https://api.jquery.com/empty/). [Accessed 11th March, 2024].

  - [How to make an audio play/pause button?](https://stackoverflow.com/questions/44358480/.      how-to-make-an-audio-play-pause-button). [Accessed 14th March, 2024].

 - [JavaScript Math max() Method](https://www.w3schools.com/jsref/jsref_max.asp).

  - [JavaScript Math max() Method](https://www.geeksforgeeks.org/javascript-math-max-method/).

- [jQuery Callback for a fadeIn and fadeOut](https://stackoverflow.com/questions/35467008/jquery-callback-for-a-fadein-and-fadeout). [Accessed 15th March, 2024].

- [jQuery fadeOut()](https://api.jquery.com/fadeOut/)

- [set background image url from Array](https://stackoverflow.com/questions/19891835/set-background-image-url-from-array). Stackflow user SatPal posted on 10th November, 2013. [Accessed 15th March, 2024].

## Acknowledgements

