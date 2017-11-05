const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

module.exports = (router) => {

    router.post('/register', (req, res) => { 
            if (!req.body.email) {
                res.json({ success: false, message: "please provide email" })
            } else {
                if (!req.body.username) {
                    res.json({ success: false, message: "please provide username " })
                } else {
                    if (!req.body.password) {
                        res.json({ success: false, message: "please provide password" })
                    } else {

                        let user = new User({
                            email: req.body.email.toLowerCase(),
                            username: req.body.username.toLowerCase(),
                            password: req.body.password
                        });

                        user.save((err) => {
                                if (err) {
                                    if (err.code === 11000) {
                                        res.json({ success: false, message: "username or e-mail already exits." });
                                    } else {
                                        if (err.errors) {
                                            if (err.errors.email) {
                                                res.json({ success: false, message: err.errors.email.message })
                                            }
                                        } else {
                                            res.json({ success: false, message: "user could not added", err });
                                        }
                                    }

                                } else { 
                                res.json({ success: true, message: "User Added Successfully" });
                            }
                        });
                }
            }
        }
    })


router.post('/login',(req,res) => {
	if(!req.body.username) {
		res.json({success: false, message:'No Username was provided' });
	} else {
		if(!req.body.password){
		res.json({success: false, message:'No password was provided' });

		} else {
			User.findOne({username: req.body.username.toLowerCase()}, (err,user) => {
				if(err) {
					res.json({success: false, message: err })
				} else {
					if(!user){
						res.json({success: false , message: 'Username ot found.'});
					} else {
						const validpassword = user.comparepassword(req.body.password);
						if(!validpassword) {
							res.json({success: false, message: 'password invalid'})
						} else {
							const token = jwt.sign({userId: user._id}, config.secret,{ expiresIn: '24h'})
							res.json({success: true, message: 'Successfully authicated',token:token,user: { username: user.username}})

						}
					}
				}
			})
		}
	}
});

// this will be work if token came here then only down functions will work
router.use((req,res,next) => {
	const token = req.headers['authorization'];
	if(!token) {
		res.json({success: false, message: "no token"});
	} else{
		jwt.verify(token,config.secret,(err,decode) => {
      if(err) {
		res.json({success: false, message: "Inavlid token"});
      } else {
      	req.decode = decode;
      	next();
      }
		});
	}
})

router.get('/profile', (req,res) => {
	User.findOne({'_id': req.decode.userId}).select('username email').exec((err,user) => {
		if(err) {
			res.json({success: false, message: err})
		} else {
			if(!user) {
				res.json({success: false , message: 'USer not found'})
			} else {
				res.json({ success: true, user: user })
			}
		}
	}) 
})
return router;
}