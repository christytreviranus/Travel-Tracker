const path = require("path");
const db = require("../models");
const trip = require("../models/trip");
const { check, validationResult } = require('express-validator');

// Necessary for image upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, cb){
    if (file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
});

        module.exports = function(app) {

            app.get('/getId', function (req, res){
                
            });

            app.get('/mytrips', function(req, res){
                db.trip.findAll({
                    where: {
                        UserId: req.user.id
                    }
                }).then(function(trips){
                res.render('trips', { trips })
                console.log(trips)
                    }); 
                      
            });


        app.get('/addtrips', function(req, res){
            res.render('trips');
        })


        // POST route for saving a new post
        app.post("/addtrip", upload.single('picture'), [                                 
            check('triptitle', 'You must enter a name for your trip.').not().isEmpty(),
            check('tripstart', 'You must enter a start date for your trip.').not().isEmpty(),
            check('tripend', 'You must enter an end date for your trip.').not().isEmpty(),
            check('path', 'You must upload an image of your trip').not().isEmpty(),
        ],
        function (req, res) {
            console.log(req.file);
            const errors = validationResult(req);
            console.log(req.body);

            if (!errors.isEmpty()) {
                res.render('profile', {
                    title: 'Oops, you need to add a trip first!',
                    errors: errors.array()
                });
            } else {
                db.trip.create({
                    tripTitle: req.body.triptitle,
                    tripStart: req.body.tripstart,
                    tripEnd: req.body.tripend,
                    picture: req.file.path,
                    UserId: req.user.id
                })                  
                .then(function (dbtrip) {
                    // res.json(dbtrip);
                    res.redirect('/mytrips');
                    // console.log(dbtrip);
                });
            }  
        });

        };            //end module exports function

        // middleware for testing purposes
        function authenticationMiddleware() {  
            return (req, res, next) => {
                console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
        
                if (req.isAuthenticated()) return next();
                res.redirect('/login')
                console.log('the user is authenticated');
            }
        }