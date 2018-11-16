var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    Status = require('./api/models/status_model'),
    port = process.env.PORT || 5002,
    cors = require('cors')
    bodyParser = require('body-parser'),
    path = require('path');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/EnvironmentStatusDb');
mongoose.connect('mongodb://heroku_0kl8frdl:d5bl93c3u6a257ocjngedpnnus@ds163226.mlab.com:63226/heroku_0kl8frdl');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var routes = require('./api/routes/status_routes');
routes(app);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);