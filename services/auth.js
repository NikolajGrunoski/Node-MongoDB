const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');
const config = require('../config/index.js');
const db = require('../db/connection');
const auth = require('../handlers/auth');
const path = require('path');


db.init(config.getConfig('db'));



var api = express();
////////////////////////////////
//Only for testing////////
////////////////////////////////
var pub = path.join(__dirname,"..",'public');
api.use("/public",express.static(pub));
////////////////////////////////
//Only for testing////////
////////////////////////////////
api.use(bodyParser.json());
api.use(jwt(
    { secret: config.getConfig('jwt').key }

)
    .unless(
        { path: ['/api/v1/auth/register', '/api/v1/auth/login','/public', '/\/api/\v1/\auth/\confirm/\.*'] }
    )
);

api.post('/api/v1/auth/register', auth.register);
api.get('/api/v1/auth/confirm/:confirm_hash', auth.confirm);
api.post('/api/v1/auth/login', auth.login);
api.get('/api/v1/auth/renew', auth.renew);
api.post('/api/v1/auth/send-reset-link', auth.resetLink);
api.post('/api/v1/auth/reset-password', auth.resetPassword);
api.post('/api/v1/auth/change-password', auth.changePassword);

api.use(function(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        res.status(401).send({error: 'Invalid token'});
    }else{
        next(err);
    }
})

api.listen(8081, err => {
    if (err) {
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Server started on port 8081');
});
