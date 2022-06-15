
# Dusty Nomad: Travel Tracker

For this project, I created an application to manage and track different trips for a traveler. After logging in, a traveler can see their past, present, upcoming and pending trips with detailed information regarding that trip. A user can also book trips that will later be approved by their travel agent. These trips show up in their pending trips section. 

### Table of Contents
- [Project Specs](#project-specs)
- [Illustrations](#illustrations)
- [Setup](#setup)
- [Project Management](#project-management)
- [Future Features](#future-features)
- [Contributor](#contributors)
- [Technologies](#technologies)


## Project Specs

Travel Tracker is an application built in week 11 of [Turing School of Software and Design](https://turing.io/). The goal of this SOLO [project](https://frontend.turing.edu/projects/travel-tracker.html) was to solidify and demonstrate the understanding of:

- Creating a robust testing suite using TDD
- Utilizing Lighthouse and Wave for Accessibility
- Making network requests to API endpoints to retrieve and manipulate data
- Utilizing third party packages
- Creating an enjoyable user experience

## Illustrations

![FitLit gif](https://media.giphy.com/media/kiAPxM21iJUPXojx50/giphy.gif)

Users can toggle between data to view their weekly stats as well as check their account info. 

![FitLit gif](https://media.giphy.com/media/WCv4SlfVogA0rQQXEG/giphy.gif)

Users can post their sleep, hydration, and activity stats. 


**[Back to top](#table-of-contents)**

## Setup

- Fork this project to your own Github account
- Clone the [repository](https://github.com/jordan-sullivan/travel-tracker.git) to your local machine
- `cd` into the project
- Run `npm install` from your command line
- Run `npm start`
- This will run the Webpack in the terminal so you can view and use the application in your browser
- Fork and clone the the [Travel Tracker API](https://github.com/turingschool-examples/travel-tracker-api.git) 
- The browser should then deploy using a local host
- Find the line that says Project is running at: [http://localhost:8080/] 
- Copy and paste that URL into your browser into your browser. 
- Now the application set up and ready to use!


## Project Management

- I used a [Github Project Board](https://github.com/jordan-sullivan/travel-tracker/projects/1) stay on task and meet the deadline.

## Future Features

- Refactor the existing CSS into Sass to create a modular design codebase
- Travel Agent Interaction including:

1. see and approve / deny trip requests
2. search for any user by name
3. View their name, a list of all of their trips, and the total amount they’ve spent (including 10% agent cut)
4. Approve a trip request for that user
5. Delete an upcoming trip for that user


## Contributor

- [Jordan Sullivan](https://github.com/jordan-sullivan)


## Technologies

- ES6 Javascript
- CSS
- HTML
- Webpack
- Fetch API
- Mocha
- Chai


**[Back to top](#table-of-contents)**


## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
