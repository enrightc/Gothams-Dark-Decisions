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

## Overall Website Aim


## External User Goals


## Website Owners Goals



## User Story

- First-time User

  

- Returning User


- Frequent User
  

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

#### Hover State Reset After Modal Closure


# TECHNOLOGY

## Languages Used:

- HTML: Employed for organising and presenting the site content.
- CSS: Utilised for the styling and layout of the site.

## Frameworks, Libraries and Programs Used


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

- Code Institute learning material
  - JQuery Library - Writing Less JavaScript  JQuery Introduction 
        - Changing HTML/CSS with jQuery 
        - JQuery Effects
        - The Importance of this
        - Events in JQuery

- For help setting the text content of selected elements and displaying questions: [w3 schools - jQuery text() Method](https://www.w3schools.com/jquery/html_text.asp) [Accessed 11th March, 2024].

- For help understanding basic quiz functions: [How to Build a Quiz App with Javascript for Beginners](https://hackr.io/blog/how-to-build-a-javascript-quiz-app) by Robert Johns 22nd Feb 2024. [Accessed 1st March 2024].

- For help understanding foreach(): [w3 schools - JavaScript Array forEach()](https://www.w3schools.com/jsref/jsref_foreach.asp) [Accessed 11th March, 2024].

- For help understanding forEach with Arrow Functions: [JavaScript forEach()](https://www.programiz.com/javascript/forEach). [Accessed 11th March, 2024].

- Removing previous text from elements [jQuery .empty()](https://api.jquery.com/empty/). [Accessed 11th March, 2024].

## Acknowledgements

