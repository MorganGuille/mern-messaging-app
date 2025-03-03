const Users = require('../models/users')

const Signup = async (req, res) => {
    console.log(req.body)

    if (!Users.findOne({ username: req.body.username })) {

        try {
            const newUser = await Users.create(req.body);
            res.status(201).send({ message: 'User created successfully' });
        } catch (error) {
            res.status(400).send({ message: 'error' });
        }
    }

    else {
        console.log('found one!')
        res.send({ message: 'User already exists' })
    }
};

module.exports = { Signup }