// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// create mongoose model
const User = mongoose.model('User', userSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error);

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, users) => {
        if (err) res.status(500).send(error);

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User(req.body);

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

router.delete('/users/:id', (req, res) => {
    User.deleteOne({_id: req.params.id}, (err) => {
        if (err) return res.status(500).send(err);

        const response = {
            message: `User ${req.params.id} successfully deleted`
        };

        return res.status(200).send(response);
    });
});

router.put('/users/:id', (req, res) => {
    User.updateOne({_id: req.params.id}, {name: req.body.name, age: req.body.age}, {new: true}, (err) => {
        if (err) return res.status(500).send(err);

        return res.status(200).send({
            message: `User ${req.params.id} successfully updated`
        });
    });
});

module.exports = router;