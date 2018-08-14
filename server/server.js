var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
const { parsed: config } = dotenv.config();
// deploy contract




const apiRoutes = require('./routes');
var User = require('./DB/models/user');
var jwt = require('jsonwebtoken');
mongoose.connect(config.DB_HOST);

var app = express();

app.set('superSecret', config.SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, './web-client/build')));

// app.get('/setup', function (req, res) {

//     var usr = new User({
//         name: 'root',
//         password: 'root@12345',
//         admin: true
//     });

//     usr.save(function (err) {
//         if (err) throw err;
//         console.log('User saved successfully');
//         res.json({ success: true });
//     });
// });

app.use('/api', apiRoutes);
app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!')
});

