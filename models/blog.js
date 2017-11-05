const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let titlelengthcheck = (email) => {
   if(!email) {
   	return false;
   } else {
   	if(email.length < 5 || email.length > 30){
   		return false;
   	} else {
   		return true;
   	}
   }
};


const titlevalidators = [
{
	validator: titlelengthcheck, message: "title must be 5character"
}
];

const blogSchema = new Schema({
title : { type: String,required: true, validate: titlevalidators},
body : { type: String,required: true},
createdBy : { type: String},
createdAt : { type: String},
createdBy : { type: String,default: Date.now()},
likes : { type: Number,default: 0 },
likedBy : { type: Array },
dislikes : { type: Number,default: 0  },
dislikedBy : { type: Array },
comments: [{
	comment: {
		type: String
	},
	commentator: {
		type: String
	}
}]
});


// userSchema.pre('save', function(next){
// 	if(!this.isModified('password'))
// 		return next();

// 		bcrypt.hash(this.password,null,null,(err,hash) => {
// 			if(err) return next(err);
// 			this.password = hash ;
// 			next();
// 		})  
// } )

// userSchema.methods.comparepassword = function(password ){
// 	return bcrypt.compareSync(password, this.password)
// }
module.exports = mongoose.model("Blog", blogSchema)
