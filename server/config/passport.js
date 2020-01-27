var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

    passport.use('login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        username = username.toLowerCase();
        User.findOne({ 'username' : username }, (err, user) => {
            if (err) {
                console.log('ERROR ON FIND USER FOR LOGIN: ' + username);
                return done(err);
            }
            if (typeof username === 'undefined' || typeof password === 'undefined') {
                return done(null, false, { error: "Please enter a valid username, password, and password confirmation." });
            } else if (username.length === 0 || password.length === 0)
                return done(null, false, { error: "Please enter a valid username and password." });
            else if (!testUser(username) || !testPass(password)) {
                return done(null, false, { error: "Incorrect username or password." });
            } else {
                if (!user) {
                    return done(null, false, { error: "Incorrect username or password." });
                } else if (!user.validPassword(password)) {
                    return done(null, false, { error: "Incorrect username or password." });
                } else if (user.validPassword(password)) {
                    return done(null, user);
                } else {
                    console.log('LOGIN ERROR [' + username + ']');
                    return done(null, false, { error: "An error has occured, please try again later." });
                }
            }
        });
    }));

    passport.use('register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        username = username.toLowerCase();
        let passconf = req.body.passconf;
        User.findOne({ 'username' : username }, (err, user) => {
            if (err) {
                console.log('ERROR ON FIND USER FOR REGISTER: ' + username);
                return done(err);
            }
            if (typeof username === 'undefined' || typeof password === 'undefined' || typeof passconf === 'undefined') {
                return done(null, false, { error: "Please enter a valid username, password, and password confirmation." });
            } else if (username.length === 0 || password.length === 0 || passconf.length === 0) {
                return done(null, false, { error: "Please enter a valid username, password, and password confirmation." });
            } else if (!testUser(username)) {
                return done(null, false, { error: "Please enter a valid username." });
            } else if (!testPass(password) || !testPass(passconf)) {
                return done(null, false, { error: "Please enter a valid password and password confirmation." });
            } else if (password != passconf) {
                return done(null, false, { error: "Your password and password confirmation must match." });
            } else {
                if (user) {
                    return done(null, false, { error: "The username [" + username + "] is already taken." });
                } else if (!user) {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    newUser.accType = "user";
                    if (newUser.username === "admin") {
                        newUser.accType = "admin"
                    }
                    newUser.save((err) => {
                        if (err) throw err;

                        return done(null, newUser);
                    });
                } else {
                    return done(null, false, { error: "An error has occured, please try again later." });
                }
            }
        });
    }));


    passport.use('changeuser', new LocalStrategy({
        usernameField : 'newuser',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        username = req.user.username.toLowerCase();
        let newuser = req.body.newuser.toLowerCase();
        User.findOne({ 'username' : username }, (err, user) => {
            if (err) {
                console.log('ERROR ON FIND USER FOR CHANGEUSER: ' + username);
                return done(err);
            } else {
                if (!user) {
                    console.log('COULD NOT FIND USERNAME FOR CHANGEUSER: ' + username);
                    return done(null, false, { error: "Your current account could not be identified." });
                } else if (user) {
                    if (typeof username === 'undefined' || typeof newuser === 'undefined' || typeof password === 'undefined') {
                        return done(null, false, { error: "Please enter a valid username, password, and password confirmation." });
                    } else if (username.length === 0 || newuser.length === 0 || password.length === 0) {
                        return done(null, false, { error: "Please fill in all required fields." });
                    } else if (!testUser(newuser)) {
                        return done(null, false, { error: "Please provide a valid username." });
                    } else if (username === newuser) {
                        return done(null, false, { error: "Your current and new username are the same." });
                    } else if (!user.validPassword(password)) {
                        return done(null, false, { error: "Invalid account password entered." });
                    } else if (user.validPassword(password)) {
                        User.findOne({ 'username' : newuser }, (err, otherUser) => {
                            if (err) {
                                console.log('ERROR ON SECOND FIND USER FOR CHANGEUSER: ' + username);
                                return done(err);
                            } else {
                                if (otherUser) {
                                    return done(null, false, { error: "An account with the requested username already exists." });
                                } else if (!otherUser) {
                                    user.username = newuser;
                                    user.save((err) => {
                                        if(err) throw err;

                                        return done(null, user)
                                    });
                                } else {
                                    return done(null, false, { error: "An error has occurred, please try again later." });
                                }
                            }
                        });
                    } else {
                        console.log('ERROR ON CHANGEUSER - USER FOUND: ' + username);
                        return done(null, false, { error: "An error has occurred, please try again later." });
                    }
                } else {
                    console.log('ERROR ON CHANGEUSER: ' + username);
                    return done(null, false, { error: "An error has occurred, please try again later." });
                }
            }
        });
    }));


    passport.use('changepass', new LocalStrategy({
        usernameField : 'currpass',
        passwordField : 'newpass',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        username = req.user.username.toLowerCase();
        let currpass = req.body.currpass;
        let newpass = req.body.newpass;
        let newpassconf = req.body.newpassconf;
        User.findOne({ 'username' : username }, (err, user) => {
            if (err) {
                console.log('ERROR ON FIND USER FOR CHANGEPASS: ' + username);
                return done(err);
            } else {
                if (!user) {
                    console.log('COULD NOT FIND USERNAME FOR CHANGEPASS: ' + username);
                    return done(null, false, { error: "An error has occurred, please try again later." });
                }
                else if (user) {
                    if (typeof username === 'undefined' || typeof currpass === 'undefined' || typeof newpass === 'undefined' || typeof newpassconf === 'undefined') {
                        return done(null, false, { error: "Please enter a valid username, password, and password confirmation." });
                    } else if (username.length === 0 || currpass.length === 0 || newpass.legnth === 0 || newpassconf.length === 0) {
                        return done(null, false, { error: "Please fill in all required fields." });
                    } else if (!testPass(currpass) || !testPass(newpass) || !testPass(newpassconf)) {
                        return done(null, false, { error: "Please enter a valid password and password confirmation." })
                    } else if (newpass != newpassconf) {
                        return done(null, false, { error: "Your new password and new password confirmation must match." });
                    } else if (user.validPassword(newpass)) {
                        return done(null, false, { error: "Your current password and new password are the same." });
                    } else if (!user.validPassword(currpass)) {
                        return done(null, false, { error: "Invalid account password entered." })
                    } else if (user.validPassword(currpass)) {
                        user.password = user.generateHash(newpass);
                        user.save((err) => {
                            if (err) throw err;

                            return done(null, user)
                        });
                    } else {
                        console.log('ERROR ON CHANGEPASS - USER FOUND: ' + username)
                        return done(null, false, { error: "An error has occurred, please try again later." });
                    }
                } else {
                    console.log('ERROR ON CHANGEPASS: ' + username);
                    return done(null, false, { error: "An error has occurred, please try again later." });
                }
            }
        });
    }));
};

function testUser(input) {
    let format = /^[a-zA-Z0-9_-]{4,16}$/
    return format.test(input)
}
function testPass(input) {
    let format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/
    return format.test(input)
}