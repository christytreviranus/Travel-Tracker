//Make edits here and remove comment after done

const express  = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home', { user: req.user }));

router.get('/register-user', (req, res) => res.render('register', { user: req.user }));
router.get('/login-user', (req, res) => res.render('register', { user: req.user }));

module.exports = router;