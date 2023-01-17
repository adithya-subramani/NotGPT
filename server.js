var cors=require('cors')
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router=require('./routes/route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/model', router);
app.use(express.static(path.resolve(__dirname,"frontend","build")));
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname,"frontend","build", "index.html")
  );
});

app.listen(process.env.PORT || 10000,()=>{
    console.log(`Server running @ ${process.env.PORT || 10000}`);
})
module.exports = app;