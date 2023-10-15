# washmen-url-converter
This service converts web urls to deeplinks for mobile navigation and vice-versa.

## Setup
* Ensure that you have nodejs installed. You can install it from [here](https://nodejs.org/en/download)
* This project makes use of yarn. You can install yarn from [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* Clone the repository
* Install packages using `yarn install`
* Add the necessary environment variables
* Start the service using `yarn start`

## IDE
This project has been developed using VSCode. But you are free to use any IDE of your choice provided it supports basic plugins like eslint.

## Folder Structure
The pattern used here is a service-repository pattern. Meaning the service(business logic) is separated from the database operations.
The files are separated or grouped together based on the module to which they belong.
For example converter module will contain:
* **models** folder which will have it's database models/schemas
* **converter.repository.js** file which will have database operations.
* **converter.service.js** which has the core business logic.
* **converter.controller.js** which calls the service file for it's operations

## API Documentation
Swagger is implemented to document API requests, responses, and specifications. Swagger UI can be found at `http://localhost:3000/api/docs` assuming your default port is 3000. If the default port is not 3000, make those changes accordingly.
***Please note you can navigate to swagger ui only after you have setup the project on your system. And it will be visible only on non-prod environments***

## Logging
Winston has been used for logging. At the moment file, and console transports have been configured. More transports can be configured if needed.

## Modules
* **Converter**: This converts the urls to deeplinks and vice-versa. Contains the entire business logic to do so.
* **Product**: This module is only used to fetch products in the database. Products have been seeded into the database assuming that we will already have a database with the list of products. This list can the be referenced and cross-verified.