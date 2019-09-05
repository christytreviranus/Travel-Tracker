const db = require("../models");
const entry = require("../models/entry");
const path = require("path");
const { check, validationResult } = require('express-validator');

// Necessary for image upload
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

module.exports = function (app) {

            app.get('/addentry', function(req, res){
                res.render('entry');
            })


            // this route is for testing 
            app.get('/testing', authenticationMiddleware(), function(req, res){
                console.log('trip id: ', req.trip.id);
                console.log('user Id: ', req.user);
                    console.log('Is Authenticated(profile): ', req.isAuthenticated());
                res.render('entry');
            })
        

            app.get('/entry', function(req, res){
                db.entry.findAll({}).then(function(entry){
                    res.render('entry', {
                        entry
                    })
                    // res.json(data);
                        });   
                // res.render('entry');
            })

            // app.get('/entry', function(req, res){
            //     db.trip.findOne({
            //         where: {
            //             id: req.trip.id
            //         }
            //     }).then(function(entry){
            //     res.render('entry', { entry })
            //         });   
            // });

            app.get('/addtrips', function (req, res) {
                res.render('trips');
            })

            //POST route for saving a new entry
            app.post('/addentry', upload.single('picture'), [                                 
                check('entrytitle', 'You must enter a name for your entry.').not().isEmpty(),
                check('entrynote', 'You must enter some text for your entry description.').not().isEmpty(),
                check('path', 'You must upload an image for this entry').not().isEmpty()
            ],       
            function (req, res) {
                console.log(req.file);
                const errors = validationResult(req);
                console.log(req.body);
    
                if (!errors.isEmpty()) {
                    res.render('profile', {
                        title: 'Oops, you did not add your entry!',
                        errors: errors.array()
                    });
                } else {
                db.entry.create(
                    {
                    entryTitle: req.body.entrytitle,
                    entryNote: req.body.entrynote,
                    entryDate: req.body.entrydate,
                    picture: req.file.path,
                    TripId: findById("#id") 
            })
                    .then(function (dbentry) {
                        // res.json(dbentry);
                        // res.render('entry');
                        console.log(dbentry);
                    });
            }
        });
};

function authenticationMiddleware() {  
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/login')
        console.log('the user is authenticated');
    }
}