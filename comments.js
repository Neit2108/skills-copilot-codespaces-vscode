// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Post a comment
app.post('/comments', function(req, res) {
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
        console.log('Comment added');
    });
    res.json(comments);
});

// Start server
var server = app.listen(3000, function() {
    console.log('Server listening on port 3000');
});