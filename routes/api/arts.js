const mongoose = require('mongoose');
const router = require('express').Router();
const auth = require('../auth');
const Arts = mongoose.model('Arts');


router.post('/', auth.required, (req, res, next) => {
    Arts.create(new Arts(req.body))
    .then((art) => res.json({ art }));
});

router.delete('/:id', auth.required, (req, res, next) => {
    Arts.findByIdAndDelete(req.params.id)
    .then((art) => res.json({ art }));
});

router.put('/:id', auth.required, (req, res, next) => {
    Arts.findByIdAndUpdate(req.params.id, req.body)
    .then((art) => res.json({ art }));
});

router.get('/', auth.required, (req, res, next) => {
    Arts.find()
    .then((art) => res.json({ art }));
});

router.get('/:id', auth.required, (req, res, next) => {;
    Arts.findOne({_id: req.params.id})
    .then((art) => res.json(art));
});
router.get('/user/:userID/', auth.required, (req, res, next) => {
    Arts.find({userID: req.params.userID})
    .then((art) => res.json(art));
});
router.get('/user/:userID/:id', auth.required, (req, res, next) => {
    Arts.findOne({_id: req.params.id, userID: req.params.userID})
    .then((art) => res.json(art));
});

module.exports = router;