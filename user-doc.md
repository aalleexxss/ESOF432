# A Comment API User Documentation

## Project Description:
This project is an api for adding comment functionality to an existing website. Using this API, comments are able
to be created, stored, liked, replied to, edited, and deleted. We decided to keep our API fairly simple while still
having enough features for it to be versatile. This takes the heavy lifting of database management off your 
shoulders but still allows you freedom in how comments are displayed on your site.

## Using our API:
**Install adonis.js:**\
In order to install adonis using npm, use `npm i @adonisjs/cli`. If npm is not installed, click [here](https://www.npmjs.com/get-npm). \
**starting adonis.js:**\
clone [this repository](https://github.com/aalleexxss/ESOF432.git). Move into the /423commentapi directory and run `adonis serve --dev`. The api is now up and running.
If there is an error, run ````npm install````. This should fix the majority of problems, if it does not, see
[adonis documentation](https://adonisjs.com/docs/4.1/installation).\
**communicating with our API:**\
Our API communicates through http request. Responses are given as JSON responses. To see all http requests that our API 
accepts, see our swagger documentation [here](https://backend-309717.wm.r.appspot.com/docs/). For more information about 
making calls to Adonis backend APIs see the Adonis documentation [here](https://adonisjs.com/docs/4.1/request).

## Frontend Example:
In this repository, we have provided an example on how a react frontend can make calls to our API. The entire 
frontend is in the [comment-frontend](https://github.com/aalleexxss/ESOF432/tree/dev/comment-frontend) directory.
Specifically, ````App.js```` in ````comment-frontend/src```` shows how a user can interact with a GUI and how 
the frontend can send that data to the backend. Notice that many of the other files in ````comment-frontend/src````
map directly to http request that the backend handles. For example, ````EditComment.js```` handles how the frontend
sends the http request to edit comments to the backend.




## Reporting Bugs
To report a bug, create an issue on github on this repository. You can also find it [here.](https://github.com/aalleexxss/ESOF432/issues)
