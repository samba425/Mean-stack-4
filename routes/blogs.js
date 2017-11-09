const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database')

module.exports = (router) => {



    router.post('/newBlog', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'Blog title is required' });
        } else {
            if (!req.body.body) {
                res.json({ success: false, message: 'Blog body is required' });

            } else {
                if (!req.body.createdBy) {
                    res.json({ success: false, message: 'Blog CreatedBy is required' });

                } else {
                    const blog = new Blog({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy
                    });
                    blog.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Blog Saved Successfully' });
                        }
                    });
                }
            }
        }
    });


    router.get('/getBlogs', (req, res) => {
        Blog.find({}, (err, blogs) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!blogs) {
                    res.json({ success: false, message: "no blogs found" })
                } else {
                    res.json({ success: true, message: blogs })
                }
            }
        }).sort({ '_id': -1 });
    })


    router.get('/singleBlog/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: "No Blog Id was Provided" })
        } else {
            Blog.findOne({ '_id': req.params.id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: "Not a Valid Blog Id" })
                } else {
                    if (!blog) {
                        res.json({ success: false, message: "Blog not found" })

                    } else {
                        User.findOne({_id: req.decode.userId},(err,user)=> {
                             if(err) {
                        res.json({success: false, message: err}); 
                             } else {
                              if(!user){
                        res.json({success: false, message: "unable to Aunticate User "}); 
                              } else { 
                                    if(user.username !== blog.createdBy){
                                  res.json({success: false, message: "Your are not Authrized to Edit this Blog"});
                                    } else { res.json({ success: true, blog: blog }) }
                              }
                             }
                        }) 
                    }
                }
            });
        }

    });

    router.put('/updateBlog', (req, res) => {
      console.log("body", req.body._id)
        if (!req.body._id) {
            res.json({ success: false, message: "No blog is found" })
        } else {
            Blog.findOne({ _id: req.body._id }, (err, blog) => {
                if (err) {
                    res.json({ success: false, message: "Blog id was not found " });
                } else {
                    if (!blog) {
                        res.json({ success: false, message: "Blog id was not valid" });

                    } else {
                        User.findOne({ _id: req.decode.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: "unable to Authocated" });

                                } else {
                                    if (user.username !== blog.createdBy) {
                                        res.json({ success: false, message: "Your are not authroized to Edit  this Blog." });
                                    } else {
                                        blog.title = req.body.title;
                                        blog.body = req.body.body;
                                        blog.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            }  else {
                                                res.json({ success: true, message: "Blog Updated Successfully" });

                                            }
                                        });
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
    });

    router.delete('/deleteBlog/:id',(req,res) => {
      if(!req.params.id) { 
            res.json({ success: false, message: "No Id Provided"});
      } else {
            Blog.findOne({ _id: req.params.id},(err,blog) => {
                  if(err) {
                        res.json({success:false, message: err});
                  } else {
                        if(!blog) {
                              res.json({ success: false, message: "Blog not Found" });
                        } else{
                              User.findOne({_id: req.decode.userId},(err,user) => {
                                    if(err){
                                          res.json({ success: false, message: err });
                                    } else {
                                          if(!user) {
                                   res.json({ success: false, message: "Enable to Authicat user"});
                                          } else {
                                               if(user.username !== blog.createdBy) {
                                                res.json({ success: false, message: "You cant authizios  to Delete this Posyt" });
                                               }  else {
                                                 blog.remove((err) => {
                                                   if(err){
                                                      res.json({ success: false, message: err });
                                                } else {
                                               res.json({ success: false, message: "Blog Delected" });
                                                }
                                                 })
                                               }
                                          }
                                    }

                              })
                        }
                  }
            })
      }
    })
    return router;
}