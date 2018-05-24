const express = require('express');
const app = express();
const mongoose = require('mongoose');

//-----------mongodbConnectivity---------------
mongoose.connect("mongodb://localhost:27017/crudDB");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to database');
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public/scripts'));

//--------------routes-------------------

app.use('/user',require('./routes/user'));
app.use('/getusers',require('./routes/getusers'));
app.use('/delete',require('./routes/delete'));
app.use('/update',require('./routes/update'));


app.get('/',(request, response) => {
    response.sendFile(__dirname + '/views/newuser.html');
});


app.listen('3000',() => {
    console.log('application is running on 3000..!!')
});