const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const models = require('../models');
const router = express.Router();

router.use(
    session({
        secret: 'huutista',
        resave: true,
        saveUninitialized: true
    })
);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    models.User.findAll().then((users) => res.send(users)).catch((err) => console.log(err));
});

router.post('/new', (req, res) => {
    console.log(req.body);
    models.User
        .findOrCreate({
            where: { username: req.body.username },
            defaults: {
                username: req.body.username,
                passwd: bcrypt.hashSync(req.body.passwd, 10)
            }
        })
        .then((newUser) => {
            if (newUser) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400).send('Error when adding new user');
            }
        });
});

router.post('/auth', (req, res) => {
    let username = req.body.username;
    let password = req.body.passwd;

    models.User
        .findOne({ where: { username: username } })
        .then((user) => {
            console.log(user);
            if (!user) res.sendStatus(400);

            bcrypt.compare(password, user.passwd, (err, isMatch) => {
                if (err) res.sendStatus(401);
                if (isMatch) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    console.log(req.session);
                    res.sendStatus(200);
                } else res.sendStatus(401).send('AUTH ERR');
            });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
