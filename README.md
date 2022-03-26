## Team-2Fast2Furious-Frontend

As noted by Team-Fast's README file, this project seeks to implement a route generation service for the Intercultural Senior Center to help them create routes for their delivery drivers. Our team, Team 2Fast2Furious, aims to build on on the work of the Team-Fast. To run this application, view README in the "frontend" folder.

## Milestone 1 Release Notes:

Due to the scope and complexity of the codebase, our first milestone objective was to simply set up the local environment. After several weeks, we have been able to successfully set up the application on all team members' machines.

The second milestone objective was to familiarize ourselves with the codebase and APIs that have been implemented. This has been a challenge as many of the tools such as PostgreSQL and REACT were unfamiliar to the group beforehand. Thus this is likely going to be an ongoing process as the group learns more about the development resources.

The third milestone objective was to fix any visible bugs that occurred within the application. This is currently a work in progress, but we are pleased to report that at least one particularly visible bug has been fixed (an output error that showed the term "undefined" in a display field). Further improvements to the display are still in development.

One of our overall objectives for the project throughout the semester is to implement a map feature for routes. As of this milestone, we have successfully implemented a static map feature which provides a visualization of a generated route. We will continue to evaluate to see whether or not this feature can be improved upon.


## Milestone 2 Release Notes:

For Milestone 2, the two primary objectives our team wanted to focus on for the frontend was:
1) Research metrics and discuss information with client.
2) Research GIS methods and how to implement them.

The team ran into some obstacles in the pursuit of these two objectives. The team sponsor, Dr. Vitor, sent an email to the Intercultural Senior Center to gather exploratory information regarding potential metrics and other possible information. Because the Intercultural Senior Center is very busy, a meeting between the organization and the team regarding metrics information had to be arranged on a date relatively late in the month (March 25th) before the due date of milestone 2. On the subject of researching GIS methods to possibly improve the map function of the application, it has become apparent in the past week that adding "nice-to-have" features to the map feature would require changing the entire implementation, which could detract from other opportunities to improve the application. Due to time constraints, our team decided it would be better to set the map feature aside because it has been implemented to an acceptable level. This decision will affect the team's decisions on upcoming milestones, which will be explained in relevant future release notes.

To compensate for these challenges, the team has decided to focus on improving other aspects of the frontend. A new page has been added to the application which will serve as a homepage. This will hopefully help provide useful information to new users as to how the application works. Another change to the application is how recipient information is entered and displayed. Finally, the user interface has been improved to provide user feedback when inputting information to generate routes.

# Installation

- Install latest version of [Nodejs](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- This project uses node version v14.17.6 and npm version 7.24.0. Check your version by running:
    - node -v
    - npm -v

- Go to the fast-frontend/frontend folder.
- If the directory "node modules" does not exist, enter the command "npm install"
- Enter "npm run start" to run the application.
