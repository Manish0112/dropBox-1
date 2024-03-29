var express = require('express');
var port = process.env.PORT || 3000;
var app = express(),
    path = require('path'),
    publicDir = path.join(__dirname, 'public');
const router = express.Router();
var upload = require('./routes/upload')
var download = require('./routes/fetch')
var index = require('./routes/index')
var cookieParser = require('cookie-parser');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session')


app.use(express.static(publicDir))


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

app.use(cors(
    {
        origin: ['http://dropboxapp-ui.cmibwegni2.us-east-2.elasticbeanstalk.com','https://dropboxapp-ui.cmibwegni2.us-east-2.elasticbeanstalk.com','https://localhost:3001','http://localhost:3001', 'http://10.0.0.137:3000', 'http://10.0.0.188:3000', 'https://10.0.0.137:3000', 'https://10.0.0.188:3000','http://www.pankajhpatil.com','https://www.pankajhpatil.com','*'],
        credentials: true,
    }
));


app.use(session({
    secret: 'my_secret_key_dropBox',
    resave: false,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,    //setting the time for active session 10 min
    activeDuration: 5 * 60 * 1000,
}))

app.use('/upload', upload);
app.use('/download', download);
app.use('/', index);

app.listen(port);


module.exports = app;
