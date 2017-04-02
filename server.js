var express = require('express');
var unixTimestamp = require('unix-timestamp');

var app = express();
var dateObject = {};

app.get('/:date',function(req,res,next){
    if (!isNaN(unixTimestamp.fromDate(req.params.date))){
        console.log(req.params.date)
        dateObject.unix = unixTimestamp.fromDate(req.params.date);
        dateObject.natural = (unixTimestamp.toDate(parseInt(unixTimestamp.fromDate(req.params.date)))).toString().substring(0,15);
    }
    
    else if (unixTimestamp.toDate(parseInt(req.params.date)) != 'Invalid Date'){
        console.log('was a date');
        dateObject.unix = req.params.date;
        dateObject.natural = (unixTimestamp.toDate(parseInt(req.params.date))).toString().substring(0,15);
    }
    else {
        console.log('was neither')
        dateObject.unix = null;
        dateObject.natural = null;
    }
    next()
})

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/:date', function(req,res){
    res.send(JSON.stringify(dateObject))
});

app.listen(8080,function(){
    console.log('Listening on 8080!')
})