const express = require('express');
const app = express();
// const session = require('express-session');
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const morgan = require('morgan');
app.use(morgan("dev"));
const ApiRouter = require('./routers/api_router');

// app.use(session({
//     secret: 'tundip',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge:1000*60*60*24*7 }
// }));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.get('/',(req,res) => res.send('ok babe'));
app.use('/api',new ApiRouter().getRouter());

module.exports = http;