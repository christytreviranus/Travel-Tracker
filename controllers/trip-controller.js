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

        app.get('/trips', function(req, res){
            db.trip.findAll({}).then(function(trips){
            res.render('trips', {
                trips
            })
            // res.json(data);
                });   
            });


        app.get("/trips/:id", function(req, res){
            const id = req.params.id;
            db.trip.findOne({
                where: {
                  id: req.user
                }
                // ,
                // include: [db.Post]
              }).then(function(req, res) {
                res.send('entry', {id});
                // res.json(dbtrip);
                console.log(tripId);
              });
        })

        // POST route for saving a new post
        app.post("/addtrip", upload.single('picture'), [                                 
            check('triptitle', 'You must enter a name for your trip.').not().isEmpty(),
            check('tripstart', 'You must enter a name for your trip.').not().isEmpty(),
            check('tripend', 'You must enter a name for your trip.').not().isEmpty(),
        ],
        function (req, res) {
            console.log(req.file);
            const errors = validationResult(req);
            console.log(req.body);

            if (!errors.isEmpty()) {
                res.render('profile', {
                    title: 'Oops, you need to and a trip first!',
                    errors: errors.array()
                });
            } else {
                db.trip.create({
                    tripTitle: req.body.triptitle,
                    tripStart: req.body.tripstart,
                    tripEnd: req.body.tripend,
                    picture: req.file.path
                })
                .then(function (dbtrip) {
                    // res.json(dbtrip);
                    res.redirect('/trips')
                });
            }  
        });



        };            //end module exports function
