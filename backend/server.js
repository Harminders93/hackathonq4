var express = require('express'),
    app = express(),
    port = process.env.PORT || 5002;

var routes = require('./api/routes/status_routes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);