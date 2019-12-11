const mProducts = require('../models/products');

const getAll = (req, res) => {

    mProducts.getAll()
        .then(data => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });

}

const getOne = (req, res) => {
    mProducts.getOne(req.params.id, req.user.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}

const save = (req, res) => {
    var data = req.body;
    let er = 0;
    if (data.name == undefined || data.name.length == 0) { er++; }
    if (data.type == undefined || data.type.length == 0) { er++; }
    if (data.description == undefined || data.description.length == 0) { er++; }
    if (data.date == undefined || data.date.length == 0) { er++; }
    if (data.price == undefined) { er++; }

    if (er == 0) {
        mProducts.save({ ...data, user_id: req.user.id })
            .then(() => {
                res.status(201).send('Created');
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        res.status(400).send('Bad request');
    }

}

const replace = (req, res) => {
    var data = req.body;
    let er = 0;
    if (data.name == undefined || data.name.length == 0) { er++; }
    if (data.type == undefined || data.type.length == 0) { er++; }
    if (data.description == undefined || data.description.length == 0) { er++; }
    if (data.date == undefined || data.date.length == 0) { er++; }
    if (data.price == undefined) { er++; }

    if (er == 0) {
        mProducts.replace(req.params.id, data)
            .then(() => {
                res.status(204).send();
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        res.status(400).send('Bad request');

    }

}

const update = (req, res) => {
    var data = req.body;

    mProducts.replace(req.params.id, data)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send(err);
        });

}

const remove = (req, res) => {
    mProducts.remove(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send(err);
        });
}



module.exports = {
    getAll,
    getOne,
    save,
    replace,
    update,
    remove

}