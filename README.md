# node-movies-app

Simple REST API for movies

## Getting Started

It that project you can create and store movies data and comment on them.  To create a new movie information, you only need to send the title of a movie. External API provide more information based on the movie title. 

### Demo
If you don't want to run the project on your machine you can easily check it here:
* [api-documentation](https://moviie-apii.herokuapp.com/api/api-docs/)
* [demo-app](https://moviie-apii.herokuapp.com/api/movies)

### Prerequisites
What things you need to install the software and how to install them

* [nodejs](https://nodejs.org/en/) - the JavaScript runtime
* [docker](https://www.docker.com/) - is an open platform for developers to build, ship and run distributed applications.

### Installing
Pull mongodb image from dockerhub
```
docker pull mongo
```
Run mongodb container
```
docker run --name mongodb -d -p 27017:27017 mongo
```
Pull node-movies-app repo
```
git clone https://github.com/b-dabrowski/node-movies-app.git
```
Go to project catalog
```
cd node-movies-app
```
Install dependencies
```
npm install
```
Run application
```
npm start
```
Open browser and go to api documentation site where you can test our api
```
localhost:3000/api/api-docs
```

## Running the tests

If you want to run test you need to be in `node-movies-app` catalog and run:
```
npm test
```

## Built With

* [nodejs](https://nodejs.org/en/) - the JavaScript runtime
* [mongodb](https://www.mongodb.com/) - stores data in flexible, JSON-like documents
* [express.js](https://expressjs.com/) - minimalist web framework for Node.js
* [body-parser](https://www.npmjs.com/package/body-parser) - body parsing middleware
* [colors](https://www.npmjs.com/package/colors) - used to colorize logs output
* [lodash](https://www.npmjs.com/package/lodash) - used to work with arrays and object faster
* [mongoose](https://www.npmjs.com/package/mongoose) - ODM for MongoDB
* [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
* [request](https://www.npmjs.com/package/request) - used to make HTTP calls to external API
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - used to serve the Swagger UI

## Author

* **Bartłomiej Dąbrowski** - [b-dabrowski](https://github.com/b-dabrowski)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
