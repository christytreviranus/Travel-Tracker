const db = require("../models");
const entry = require("../models/entry");
const path = require("path");

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

        app.get('/entry', function(req, res){
            db.Entry.findAll({}).then(function(entry){
                res.render('entry', {
                    entry
                })
                // res.json(data);
                    });   
            // res.render('entry');
        })

        app.post('/addentry', upload.single('picture'), function(req, res){
            db.Entry.create({
                entryTitle: req.body.entrytitle,
                entryNote: req.body.entrynote,
                entryDate: req.body.entrydate,
                picture: req.file.path
            })
            .then(function (dbEntry) {
                res.json(dbEntry);
                // res.render('entry');
                // console.log(dbEntry);
            });
        })



}