# A Comment API Developer Documentation
## Obtaining Source Code:
Our source code is hosted here on this Github repository! To get a copy for yourself you will need to clone it to your local machine.
```
git clone https://github.com/aalleexxss/ESOF432.git
```
## Directory Structure and Important files:
**app/Controllers/Http/CommentController.js:**\
This file handles request made to our API. It then updates the database and/or returns data to the frontend.\
**database/migrations/1618290470522_comments_schema.js:**\
This file defines the schema of our database. To update the database schema, change this file and then run 
````adonis migration:run````.\
**config:**\
This directory stores all the configuration files of our API. For more information about config files and 
the overall directory structure of Adonis applications, see Adonis documentation [here](https://adonisjs.com/docs/4.1/folder-structure).

## UML Diagram and Design Decisions
![UML diagram](https://github.com/aalleexxss/ESOF432/blob/32ff6dcd2328bb58292481925a20b79346c2840a/UML.png)
Our API uses the model view controller pattern as depicted in the above diagram. The view aspect of this API is 
a simple frontend created with react. The controller is the commentController class which gets requests from the 
view, and sends commands to the model. The model then stores or alters a database and returns data to the controller
if applicable. The controller then renders the returned data to the view. This pattern works very well when designing
a backend API because the frontend is completely isolated from the backend logic. Additionally, this pattern is easily
scalable meaning if our application were to grow in size, it would still be easy to maintain. 
## Running Software
In order to run this source code, you must have Node.js, npm, and AdonisJs installed. to install npm and node, follow
the instructions found [here](https://www.npmjs.com/get-npm). Once node and npm are installed, open a shell and run the
command ````npm i -g @adonisjs/cli````. Once all three of these are installed, you're going to need to use 
`adonis serve --dev` when in the directory `423commentapi`. This gets the backend section of our site running locally.
Next, navigate to the `comment-frontend` directory and run `start`. This will boot up the frontend locally. You may 
have to go into `comment-frontend/src/apiService` and change `baseURL` to the URL that Adonis is being hosted locally.
## Testing the Software
Testing for this API is done with cypress and cucumber. Tests can be found in `cypress/integration/BDDtests`. Test
are in the form of javascript files and all current tests can be found in  `cypress/integration/BDDtests/FullFeatureTest`.
more information about testing with cypress can he found at [https://www.cypress.io/](https://www.cypress.io/).
## Automated Build and Test
Tests are scheduled to run every night at midnight.
## Releasing a Version
To create a new release one must first upload a verison of the code with a tag of the version that they are planning on releasing. Then you can follow this tutorial to create a release on Github [here](https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release).
## Accessing Bugs
Bugs will be created as an issue on this Github repository. You can also find it [here](https://github.com/aalleexxss/ESOF432/issues).
## Commenting Code
Please try to comment your code so it is easy for others to follow and see what changes you made.
