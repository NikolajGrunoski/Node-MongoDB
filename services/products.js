const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');

const config = require('../config/index.js');
const DBconn = require('../db/connection');
const products = require('../handlers/products');

var c = config.getConfig('db');

DBconn.init(c);
const api = express();
api.use(bodyParser.json());

api.get('/api/v1/products', products.getAll);
api.get('/api/v1/products/:id', products.getOne);
api.post('/api/v1/products/', products.save);
api.put('/api/v1/products/:id', products.replace);
api.patch('/api/v1/products/:id',products.update);
api.delete('/api/v1/products/:id', products.remove);

api.listen(8083, err => {
    if (err) {
        console.log('could not start server');
        return;
    }
    console.log('server started successfully on port 8083');
});