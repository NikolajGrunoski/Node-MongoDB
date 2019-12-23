const mUsers = require('../models/users');
const vUsers = require('../validators/users');
var validator = require('node-input-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/index.js');
const randomString = require('randomstring');
const sgMail = require('@sendgrid/mail');

const register = (req, res) => {
    var v = new validator.Validator(req.body, vUsers.createUser);
    v.check()
        .then(matched => {
            if (matched) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        throw new Error(err);
                        return;
                    }
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) {
                            throw new Error(err);
                            return;
                        }
                        var confirm_hash = randomString.generate({
                            length: 30,
                            charset: 'alphanumeric'
                        });
                        mUsers.createUser({
                            ...req.body,
                            password: hash,
                            onfirm_hash: confirm_hash,
                            confirmed: false
                        });
                    });
                    const msg = {
                        to: 'nikolaj.grunoski@gmail.com',
                        subject: 'Sending with Twilio SendGrid is Fun',
                        text: 'and easy to do anywhere, even with Node.js',
                        html: `<a href='http://localhost:8081/api/api/v1/confirm/${confirm_hash}'>Click here to confirm your account <a/>`,
                    };
                    sgMail.send(msg);
                    return;
                });

            } else {
                throw new Error('Validation failed');
            }
        })
        .then(() => {
            return res.status(201).send('ok');
        })
        .catch(err => {
            console.log(err);
            return res.status(201).send(v.errors);
        });


}

const login = (req, res) => {
    mUsers.getUserPasswordByEmail(req.body.email)
        .then((data) => {
            // console.log(data);
            bcrypt.compare(req.body.password, data.password, function (err, rez) {
                if (err) {
                    return res.status(500).send('Could not compare password');
                }
                if (data) {

                    var tokenData = {
                        id: data._id,
                        full_name: `${data.first_name} ${data.last_name}`,
                        email: data.email
                    };
                    var token = jwt.sign(tokenData, config.getConfig('jwt').key);
                    return res.status(200).send({ jwt: token });
                }
                return res.status(404).send('not found');

            });
        })

        .catch(err => {
            console.log(err);
            return res.status(500).send('Could not get user');
        })


};

const renew = (req, res) => {

    return res.status(200).send(req.user);
}

const resetLink = (req, res) => {

    return res.status(200).send('ok')
}

const resetPassword = (req, res) => {

    return res.status(200).send('ok')
}

const changePassword = (req, res) => {

    return res.status(200).send('ok')
}

const confirm = (req, res) => {
    // koga nekoj kje klikne na 
    // http://localhost:8080/auth/v1/confirm/[CONFIRM_HASH]
    // go nosi na ovoj handler
    // go prezemate hash-ot
    // proveruvate vo baza dali vakov hash postoi
    // ako postoi na istiot record mu setirate
    // confirmed: true

    var hash = req.params.confirm_hash;
    mUsers.confirmUserAccount(hash)
        .then(() => {
            return res.status(200).send('ok');
        })
        .catch((err) => {
            return res.status(200).send('Internal Server Error');
        })
}

module.exports = {
    register,
    login,
    renew,
    resetLink,
    resetPassword,
    changePassword,
    confirm
}