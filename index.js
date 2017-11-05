const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');

const aunticate = require('./routes/aunticate')(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err) => {
	  if(err)
	  	console.log("mongoose not connected", err);
	  else
	  	console.log("mongo db Connected Successfully")
});
app.use(cors({
	origin: 'http://localhost:4200' 
}))
app.use(bodyparser.urlencoded({extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/auth', aunticate);

app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})


app.listen(5000, () => {
	console.log("listen on port 5000")
});