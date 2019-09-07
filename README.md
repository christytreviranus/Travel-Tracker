# Travel-Tracker
<p>A full stack MVC (model-view-controller) application.  Travel Tracker is perfect for the avid travel looking for a way to store their explorations in digital format.

## Live
https://guarded-eyrie-29856.herokuapp.com/

### How the app works
This project is a full stack application that allows users to create their own digital travel diary. Users will begin by logging into their account or signing up for a new one.  Once logged in, the user will be able to view their previously created trips or create a new one which will be stored to a MYSQL database with a unique identifier so that all created data is user specific.  After a trip is created, users will be able to view and create entries for their trip to track their adventures including things like hotels, excursions, and restaurants.  With trips and entries users can store pictures to be associated with them as well. 

### How the app is built
This project uses MySQL, Node, Express, Handlebars, Sequelize, and JavaScript. MySQL and Sequelize are used to query and route data in the application. Express is the backend web framework used for this application, and Handlebars is a templating language that is used to generate the HTML.

### MVC design pattern
This project also follows the MVC (Model-View-Controller) design pattern. The MVC design pattern assigns objects in the application one of three roles (model, view, or controller) and defines the way the different parts of the application communicate with one another.

  * <b>View object:</b>
  A view object is an object in the application that is visible (in the user interface) to the end user of the application. The view displays data from the application's model and learns about any changes to the model data via the controller. For example, in this application, the user enters a burger name in a text field. The view communicates the user input via the controller to the model.

  * <b>Controller object:</b>
  A controller object controls the flow of data between the view and the model (that is, the controller is an intermediary between the two). The controller interprets any user changes made in the view and communicates the changed data to the model. Also, if the model were to change, the controller is what communicates the updated data to the view so that the user can see the updated data in the user interface.

  * <b>Model object:</b>
  A model object manages the data. When data is created or changed by the user in the view (for example, a user devours or throws away a burger), that change is communicated via the controller to the model. Also, when data is created or changed in the model, the model communicates that change via the controller to the view, and the view displays the updated data to the user.

For more information about the MVC design pattern, check out the following resources:
  * https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
  * https://docs.microsoft.com/en-us/aspnet/core/mvc/overview

## Getting started
The following section will take you through the steps of setting up this application and getting it running locally on your computer.

If you don't want to set up this project locally and just want to see the deployed application, go to  https://guarded-eyrie-29856.herokuapp.com/

To set up this application locally on your computer, perform the following steps:
  1. [Clone the repository]
  2. [Install Node.js]
  3. [Install the dependencies]
  4. [Install MySQL Workbench]
  5. [Set up a development database]
  6. [In the terminal run the migration files to create the tables and foreign key associations]
  7. [Create a .env file to store your MySQL Password]
  8. [Verify database connection information]
  9. [Start the server]

## Technologies Used

*JavaScript
*HTML
*Sequelize
*MYSQL
*Handlebars
*Express
*Node
*Passport
*BCrypt

