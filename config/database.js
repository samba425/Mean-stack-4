// const crypto = require('crypto').randomBytes(256).toString('hex');

// module.exports = {
// 	if(process.env.NODE_ENV === 'production'){
// 		 uri: 'mongodb://samba425:samba425@ds121896.mlab.com:21896/comments',
// 			secret: crypto,
// 			db: 'meanstack4'
// 		} else {
// 			uri: 'mongodb://localhost:27017/meanstack4',
// 			secret: crypto,
// 			db: 'meanstack4'
// 		}
		
// } 

if(process.env.NODE_ENV === 'production') {
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    ri: 'mongodb://samba425:samba425@ds121896.mlab.com:21896/comments',
			secret: crypto,
			db: 'meanstack4'
}
} else { 
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
   uri: 'mongodb://localhost:27017/meanstack4',
			secret: crypto,
			db: 'meanstack4'
}
}