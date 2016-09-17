'use strict';
var inspect = require('util').inspect;
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs-extra');
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
require('rootpath')();
var User = require('db/models/users');
var Post = require('db/models/post');
var Chat = require('db/models/chat');
var salt = bcrypt.genSaltSync(10);
var nodemailer = require('nodemailer');
var path = require('path');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'taslim.khan027@gmail.com', // Your email id
        pass: '' // Your password
    }
});



var passport = require('passport');
exports.signUpUser = function(req, res, next) {
    console.log("called", req.body);


    passport.authenticate('local-signup', function(err, data, message) {
        console.log('reached');
        if (err) {
            res.json({ success: false, message: message });
        } else if (!data) {
            res.json({ success: false, message: message });
        } else {
            return res.json({ success: true, message: message });
        }
    })(req, res, next);
}

exports.loginUser = function(req, res) {
    console.log("called", req.body);
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return res.json({
                success: false,
                "message": err
            });
        }
        if (!user) {
            return res.json({
                success: false,
                "message": "Invalid Username or Password"
            });
        } else {
            console.log('user', user);
            req.login(user, function(err, respose) {
                console.log('Inside req.login', err, respose);
                //if(req.body.rememberme && (req.body.rememberme == "1" || req.body.rememberme == 1)){
                req.session.cookie.expires = false;
                req.session.name = user.userid;
                req.session.cookie.expires = new Date(Date.now() + (28 * 24 * 3600000));
                req.session.cookie.maxAge = 28 * 24 * 3600000;
                req.session.cookie.expires = false;


                return res.json({ success: true, "message": "login sucessful", user: user });
            });
        }
    })(req, res);




}
exports.updatedata = function(req, res) {
    //var id = req.body._id;

    // console.log("In image update");
    // console.log("Headers:::::::::::",req.headers);
    // console.log("Query:::::::::::",req.query);
    var id = req.query.id;
    var fstream;
    var imageurl = "";
    var busboy = new Busboy({ headers: req.headers });
    console.log(busboy);
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

        //Added to save file
        var type = mimetype.split('/')[1];
        var newName = (new Date()).valueOf();
        var saveTo = path.join('public/upload/', newName + '.' + type);
        imageurl = path.join('upload/', newName + '.' + type);
        fstream = fs.createWriteStream(saveTo);
        file.pipe(fstream);
        //end

        file.on('data', function(data) {
            //console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            //console.log('File [' + fieldname + '] Finished');

        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');

        var objpost = {
            userId: req.user._id,
            category: req.query.category,
            title: req.query.title,
            description: req.query.description,
            image: imageurl,
            createdon: new Date()
        };

        console.log(req.body);

        Post.update({ _id: id }, objpost, function(error, result) {
            // console.log(data);
            if (error) {
                res.json({ success: false, data: [], message: "Post did not updated" });
            } else {

                res.json({ success: true, data: result, message: "Post updated successfully" });
            }
        });
    });
    req.pipe(busboy);
}

// exports.updatedata = function(req, res) {
//         //console.log('hgfhfhdfhdfh', req.body);

//         var id = req.body._id;

//         console.log(req.body);

//         Post.update({ _id: id }, { title: req.body.title, description: req.body.description }, function(error, data) {
//             // console.log(data);
//             if (data) {
//                 res.json(data);
//             }
//         });
//     }
// exports.addcategory = function(req, res) {
//     console.log("called", req.body);

//     Post.create({

//         title: req.body.title,
//         category: req.body.category,
//         description: req.body.description,
//         userId: req.user._id

//     }, function(err, todo) {
//         if (err) {
//             console.log("err", err);
//             res.send(err);
//         } else {
//             console.log("inserted");
//             return res.json({

//                 message: 'success',
//                 user: todo
//             })
//         }


//     });


// }
exports.addpost = function(req, res) {
    var fstream;
    var imageurl = "";
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

        //Added to save file
        var type = mimetype.split('/')[1];
        var newName = (new Date()).valueOf();
        var saveTo = path.join('public/upload/', newName + '.' + type);
        imageurl = path.join('upload/', newName + '.' + type);
        fstream = fs.createWriteStream(saveTo);
        file.pipe(fstream);
        //end

        file.on('data', function(data) {
            //console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            //console.log('File [' + fieldname + '] Finished');

        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
        //console.log('Done parsing form!', req.user._id);


        var objpost = {
            category: req.query.category,
            title: req.query.title,
            description: req.query.description,


            image: imageurl,
            createdon: new Date(),
            userId: req.user._id,
        };

        Post.create(objpost, function(err, data) {
            console.log(err, data);
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (data) {
                    res.json({ success: true, message: "post Created Successfully", data: data });
                } else {
                    res.json({ success: false, message: "Error in processing the request." });
                }
            }
        });


    });
    req.pipe(busboy);
}



// exports.getdata = function(req, res) {
//     console.log('inside getdata', req.query);


// Post.find({ 'userId': req.user._id }, function(err, user) {


//     if (err) {
//         return res.json({
//             success: false,
//             "message": err
//         });

//     } else {
//         return res.json({
//             success: true,
//             "message": 'Got Data',
//             data: user
//         });
//     }
// });
exports.getdata = function(req, res) {
    console.log('inside getdata', req.query);
    Post.count({ 'userId': req.user._id }).exec(function(err, count) {
        Post.find({ 'userId': req.user._id }).skip(parseInt(req.query.skip, 10)).limit(parseInt(req.query.limit, 10)).exec(function(err, user) {
            //console.log("error", err);
            //console.log("user", user);
            console.log("count", count);

            if (err) {
                return res.json({
                    success: false,
                    "message": err
                });

            } else {
                return res.json({
                    success: true,
                    "message": 'Got Data',
                    data: user,
                    count: count




                });
            }
        });
    });
}





exports.LoggedIn = function(req, res, next) {
    console.log('LoggedIn', req.isAuthenticated());


    if (req.user) {
        return res.json({
            'message': 'user exist',
            'success': true,
            user: req.user
        });
    } else {
        return res.json({
            'message': 'user not exist',
            'success': false
        });
    }



}


exports.logout = function(req, res, user) {
    console.log('logout', req.isAuthenticated(req.user._id));
    User.update({ _id: req.user._id }, { isOnline: false }, function(err, data) {
        req.logout();
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            }
            // The response should indicate that the user is no longer authenticated.
            return res.send({ authenticated: req.isAuthenticated() });
            res.redirect('/login');
        });
    });
}


exports.delete = function(req, res) {

    console.log("called remove post user ")

    console.log(req.body.id);
    var id = req.body.id;
    if (id !== '') {
        Post.remove({
            'questions._id': id,
        }, function(err, results) {});
        Post.remove({ '_id': id }, function(err, results) {
            return res.json({ "success": true });
        });
    }

}

exports.forgotpass = function(req, res, next) {

    console.log("forgot password", req.body.email);
    User.findOne({ 'local.email': req.body.email }, function(err, user) {
        console.log('Error', err);
        console.log('user', user);
        if (err) {
            return res.json({
                success: false,
                "message": "user not exist"
            });

        } else {

            var randomString = function(length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;

            }
            var token = randomString(20);
            console.log(token);
            var mailOptions = {
                from: 'taslim.khan027@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: 'Hello taslim', // Subject line
                // text: "randomString"


                html: '<a href="http://localhost:8000/resetpassword?token=' + token + '">Clickhere</a>'
            };
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            User.update({ 'local.email': req.body.email }, { $set: { resetPasswordToken: token } }, function(err, data) {
                console.log(err, data);
            });
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.json({ yo: 'error' });
                } else {
                    console.log('Message sent: ' + info.response);
                    res.json({ yo: info.response });
                };
            });
            // });



        }
    });
}




exports.reset = function(req, res) {
    console.log('req.params.token', req.params.token);

    res.sendfile('resetpassword.html', { root: path.join(__dirname, '../../public/views') });
    console.log("called reset");

}

exports.passwordResetCheck = function(req, res) {
    console.log(" Password reset check");
    var newUser = new User();
    var Conformpassword = newUser.generateHash(req.body.usersdata.newpassword);
    // User.findOne({ token })
    console.log(req.body);
    User.update({ 'resetPasswordToken': req.body.token }, { $set: { 'local.password': Conformpassword } },

        function(err, user) {
            console.log(err, user);
            if (err) {
                return res.json({
                    success: false,
                    "message": "not update"
                });
            } else {


                return res.json({

                    success: true,
                    "message": 'Password update successfully',
                    data: user
                });
            }
        });



}
exports.getmsg = function(req, res) {
    console.log("msggggggggggg", req.user._id);
    // console.log("senderID",senderID);
    Chat.find({ 'senderID': req.user._id }, function(err, user) {


        if (err) {
            return res.json({
                success: false,
                "message": err
            });

        } else {
            return res.json({
                success: true,
                "message": 'Got message',
                data: user
            });
        }
    });
}
exports.getpopup = function(req, res) {
    console.log("show popup");
   
}