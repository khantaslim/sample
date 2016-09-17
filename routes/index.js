require('rootpath')();

module.exports = function(app, passport) {
    // console.log("routes found");
    var path = require('path');
    var usersController = require('app/controllers/usersController');
    app.post('/api/post/data', usersController.signUpUser);
    app.post('/api/logindetail', usersController.loginUser);
    app.post('/api/userlogout', usersController.logout);
    app.post('/password_reset', usersController.passwordResetCheck);
    app.post('/api/postdetail', usersController.addpost);
    app.post('/api/updatepost', usersController.updatedata);
    app.get('/api/post/add', usersController.getdata);
    app.get('/api/userexist', usersController.LoggedIn);
    app.post('/api/delete/category/id', usersController.delete);
    app.post('/api/forgot', usersController.forgotpass);
    app.get('/resetpassword*', usersController.reset);
    // app.post('/api/updatepost',usersController.updatedata);
    app.get('/api/getmessages', usersController.getmsg);
    //     app.get('/api/getmessages', function(req, res) {
    //     console.log("get message called", req.user);
    // });

app.get('/api/getreciveid/id',usersController.getpopup);
    //app.post('/password_reset', usersController.passwordResetCheck);


    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    // app.get('/auth/facebook', function(req, res) {
    //     console.log(req.body);
    // });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    function facebookAuthentication(req, res, next) {
        passport.authenticate('facebook', function(err, data) {
            if (err) {
                res.json({ success: false, message: '', err: err });
            } else {
                res.json({ success: true, message: 'Login successfull' });
            }
        })(req, res, next);
    }


    // handle the callback after facebook has authenticated the user
    //app.get('/auth/facebook/callback', facebookAuthentication);

    app.get("/auth/facebook/callback",
        passport.authenticate("facebook", {
            successRedirect: '/category',
            failureRedirect: "/"
        }));
    // route for logging out
    app.get('/logout', function(req, res) {
        console.log('LoggedIn', req.isAuthenticated());
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter', { scope: ['email'] }));

    function twitterAuthentication(req, res, next) {
        passport.authenticate('twitter', function(err, data) {
            if (err) {
                res.json({ success: false, message: '', err: err });
            } else {
                res.json({ success: true, message: 'Login successfull' });
            }
        })(req, res, next);
    }
    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/category',
            failureRedirect: '/'
        }));
    app.get('/logout', function(req, res) {
        console.log('LoggedIn', req.isAuthenticated());
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    function googleAuthentication(req, res, next) {
        passport.authenticate('google', function(err, data) {
            if (err) {
                res.json({ success: false, message: '', err: err });
            } else {
                res.json({ success: true, message: 'Login successfull' });
            }
        })(req, res, next);
    }
    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/category',
            failureRedirect: '/'
        }));
    app.get('/logout', function(req, res) {
        console.log('LoggedIn', req.isAuthenticated());
        req.logout();
        res.redirect('/');
    });

    app.get('*', function(req, res) {
        console.log('inside *');
        res.sendfile('index.html', { root: path.join(__dirname, '../public') });


    });



};

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }



// };
