const Users = require('../models/users')
const jwt = require('jsonwebtoken');

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

const checkPassword = (pswToCheck, DBPsw) => { //// this is a temp stand in 

    if (pswToCheck === DBPsw) {
        return true
    } else {
        return false
    }
}

const Login = async (req, res) => {

    try {
        const user = await Users.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send({ message: 'Invalid username' });
        }

        if (checkPassword(req.body.password, user.password)) {

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.send({ ok: true, message: `Password for user ${user.username} is correct`, token: token, userID: user._id })

        } else {
            return res.send({ ok: false, message: `Password for user ${user.username} is incorrect` })
        }
    } catch (error) {
        res.status(400).send({ message: 'error' });
    }

}

module.exports = { Signup, Login }