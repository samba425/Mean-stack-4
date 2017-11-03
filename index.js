const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err) => {
	  if(err)
	  	console.log("mongoose not connected", err);
	  else
	  	console.log("mongo db Connected Successfully")
});

app.use(express.static(__dirname + '/client/dist/'))
app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})


app.listen(5000, () => {
	console.log("listen on port 5000")
});