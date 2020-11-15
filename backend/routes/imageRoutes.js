const express = require('express');
const fileUpload = require('express-fileupload');
const moment = require('moment');
const router = express.Router();
const models = require('../models');

router.use(fileUpload());

router.get('/', (req, res) => {
    models.Image
        .findAll()
        .then((image) => {
            res.send(image);
        })
        .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
    models.Image.findByPk(req.params.id).then((img) => {
        if (img) {
            res.send(img);
        } else {
            res.send();
        }
    });
});

router.post('/upload', (req, res) => {
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No file');
    }

    let file = req.files.file;
    file.name = `${moment().format('DDMMYYYYHHmmss')}.${file.mimetype.split('/')[1]}`;
    file.mv(`./images/${file.name}`, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    });

    models.Image
        .create({
            imgName: file.name,
            uploader: req.body.uploader,
            category: req.body.category,
            location: req.body.location,
            desc: req.body.description
        })
        .then((img) => {
            if (img) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }
        })
        .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
    models.Image
        .destroy({
            where: { id: req.params.id }
        })
        .then((deletedImg) => {
            res.json(deletedImg);
            res.sendStatus(200);
        })
        .catch((err) => console.log(err));
});
module.exports = router;
