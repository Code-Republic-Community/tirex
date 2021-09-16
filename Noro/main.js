const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.listen(3000,function(){ 
    console.log("Server listening on port: 3000"
)});

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'./css/')));
app.use(express.static(path.join(__dirname,'./HTML/')));

app.get('/tirex', function(req,res){
    res.sendFile(path.join(__dirname,'./HTML/index.html'));
    console.log("index");
});

app.get('/search',function(req,res){
    res.sendFile(path.join(__dirname,'./HTML/search.html'));
    console.log("search");
})

app.get('/search/img',function(req,res){
    res.sendFile(path.join(__dirname,'./HTML/img.html'));
    console.log("img");
})

app.get('/search/video',function(req,res){
    res.sendFile(path.join(__dirname,'./HTML/videos.html'));
    console.log("video");
})