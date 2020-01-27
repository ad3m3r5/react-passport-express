const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/user', (req, res, next) => {
    if (req.isAuthenticated()) {
        user = req.user.toJSON()
        user = { username: user.username }
        return res.json({ user: user })
    } else {
        return res.json({ user: null })
    }
})

router.post('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        var response = { redirect: "/profile", message: "You are already logged in." };
        return res.json(response);
    } else {
        if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined'
            || req.body.username.length === 0 || req.body.password.length === 0) {
            var response = { error: "Please enter a valid username and password." }
            return res.json(response)
        } else {
            passport.authenticate('login', (e, user, info) => {
                if(e) return next(e);
                if(info) return res.send(info);
    
                req.logIn(user, e => {
                    if(e) return next(e);
    
                    user = user.toJSON()
                    user = { username: user.username }
                    return res.send(user);
                });
            })(req, res, next);
        }
    }
})

router.post('/register', (req, res, next) => {
    if (req.isAuthenticated()) {
        var response = { redirect: "/profile", message: "You are already logged in." };
        return res.json(response);
    } else {
        if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined' || typeof req.body.passconf === 'undefined'
            || req.body.username.length === 0 || req.body.password.length === 0 || req.body.passconf.length === 0) {
            var response = { error: "Please enter a valid username, password, and password confirmation." }
            return res.json(response)
        } else {
            passport.authenticate('register', (e, user, info) => {
                if(e) return next(e);
                if(info) return res.send(info);

                req.logIn(user, e => {
                    if(e) return next(e);

                    user = user.toJSON()
                    user = { username: user.username }
                    return res.send(user);
                });
            })(req, res, next);
        }
    }
})

router.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout()
        var response = { message: "You have logged out." }
        return res.json(response)
    } else {
        var response = { error: "You are not logged in." }
        return res.json(response)
    }
})

router.post('/changeuser', (req, res, next) => {
    if (req.isAuthenticated()) {
        if (typeof req.user.username === 'undefined' || typeof req.body.newuser === 'undefined' || typeof req.body.password === 'undefined'
            || req.user.username.length === 0 || req.body.newuser.length === 0 || req.body.password.length === 0) {
            var response = { error: "Please enter a valid new username and current password" }
            return res.json(response)
        } else {
            passport.authenticate('changeuser', (e, user, info) => {
                if(e) return next(e);
                if(info) return res.send(info);

                req.logIn(user, e => {
                    if(e) return next(e);

                    user = user.toJSON()
                    user = { username: user.username }
                    let response = { user: user, message: "Your username has been successfully updated." }
                    return res.send(response);
                });
            })(req, res, next);
        }
    } else {
        var response = { error: "You are not logged in." };
        return res.json(response);
    }
})

router.post('/changepass', (req, res, next) => {
    if (req.isAuthenticated()) {
        if (typeof req.user.username === 'undefined' || typeof req.body.currpass === 'undefined' || typeof req.body.newpass === 'undefined' || typeof req.body.newpassconf === 'undefined'
            || req.user.username.length === 0 || req.body.currpass.length === 0 || req.body.newpass.length === 0 || req.body.newpassconf.length === 0) {
            var response = { error: "Please enter your current password and a valid new password and password confirmation." }
            return res.json(response)
        } else {
            passport.authenticate('changepass', (e, user, info) => {
                if(e) return next(e);
                if(info) return res.send(info);

                req.logIn(user, e => {
                    if(e) return next(e);

                    user = user.toJSON()
                    user = { username: user.username }
                    let response = { user: user, message: "Your password has been successfully updated." }
                    return res.send(response);
                });
            })(req, res, next);
        }
    } else {
        var response = { error: "You are not logged in." };
        return res.json(response);
    }
})

module.exports = router;