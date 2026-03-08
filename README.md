# Garage AngularUI

A lightweight web UI for managing a Garage S3 cluster.\
This project aims to provide a simple and clean administration interface for Garage while staying easy to run and easy to understand.\
The application is written in Angular and intentionally designed as a frontend-only application.


> ⚠️ This project is in a very early stage and should currently be considered experimental.

## Motivation

There are already existing projects that provide a web interface for Garage:
- https://github.com/khairul169/garage-webui
- https://github.com/Noooste/garage-ui
- https://git.deuxfleurs.fr/Deuxfleurs/garage-webadmin/

All these projects are great and definitely worth checking out.\
However, this project was created with a slightly different goal.
At the time this project was started:
- the projects used a different technology stack
- two projects used a separate backend and frontend architecture

This project explores a simpler approach:\
A single frontend application that talks directly to the Garage Admin API.\


## Testing the Application Locally

1. Install dependencies:
   `npm install`
2. Generate API client classes:
   `npm run generate-api`
3. Run the application in dev mode:
   `ng serve`
4. Open your browser and navigate to `http://localhost:4200` to access the application.


## Screenshots

A example how the UI looks right now comming soon
