const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user_model.js");
const db = require("../models");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


        router.get('/', function (req, res, next) {
            console.log('User Id: ', req.user);
            console.log('Is Authenticated(home): ', req.isAuthenticated());
            res.render('home');
        });

        router.get('/register', function (req, res) {
            res.render('register', { title: 'Registration Page' });
        });

        router.get('/profile', authenticationMiddleware(), function (req, res) {
            console.log('User Id: ', req.user);
            console.log('Is Authenticated(profile): ', req.isAuthenticated());
            res.render('profile', { title: 'This is Your Profile Page' });
        });

        router.get('/login', function(req, res){
            res.render('login', { title: 'Login Page' })
        });

        router.post('/login', passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login'
        }));

        router.get('/logout', function(req, res){
            req.logout();
            req.session.destroy();
            res.redirect('/');
        });

        // router.get('/googlelogin', function(req, res, next){
        //     res.render('google_login');
        // })

        router.post('/register', [                                   //function (req, res, next) {  
            check('username', 'Username field cannot be empty.').not().isEmpty(),
            check('username', 'Username must be between 4-15 characters long.').isLength({ min: 4, max: 15 }),
            check('email', 'The email you entered is invalid, please try again.').isEmail(),
            check('email', 'Email address must be between 4-100 characters long, please try again.').isLength({ min: 4, max: 100 }),
            check('password', 'Password must be between 8-100 characters long.').isLength({ min: 8, max: 100 }),
            check('password', "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
            check('passwordMatch', 'Password must be between 8-100 characters long.').isLength({ min: 8, max: 100 }),
            // check('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password)
        ],
            function (req, res) {
                const errors = validationResult(req);
                console.log(req.body);

                if (!errors.isEmpty()) {
                    res.render('register', {
                        title: 'Registration Error!',
                        errors: errors.array()
                    });
                    // return res.status(422).jsonp(errors.array());
                } else {

                    const username = req.body.username;
                    const email = req.body.email;
                    const password = req.body.password;
                    const hash = bcrypt.hashSync(req.body.password, 10);
                      
                    db.User.create(
                        {
                            username: username,
                            email: email,
                            password: hash
                        })
                        .then(function(user) {
                            // console.log(user.id);
                            // if(err) throw err;

                            const user_id = user.id;

                            req.login(user_id, function(err){
                                res.redirect('/profile');
                            })
                   
                    // res.render('reg-complete', { title: 'Registration Complete', welcome: req.body.username });
                    
                        })         
                }

                
            });
                    passport.serializeUser(function(user_id, done) {
                        done(null, user_id);
                      });
                      
                      passport.deserializeUser(function(user_id, done) {
                        // User.findById(user_id, function (err, user_id) {
                          done(null, user_id);
                        // });
                      });

                      function authenticationMiddleware() {  
                        return (req, res, next) => {
                            console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
                    
                            if (req.isAuthenticated()) return next();
                            res.redirect('/login')
                        }
                    }

module.exports = router;

