const mFilmovi = require('../models/filmovi');

const getAll = (req, res) => {
    mFilmovi.getAll(req.user.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });

}

const getOne = (req, res) => {
    mFilmovi.getOne(req.params.id, req.user.id)
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
    if (data.ime == undefined || data.ime.length == 0) { er++; }
    if (data.rezija == undefined || data.rezija.length == 0) { er++; }
    if (data.godina == undefined || data.godina.length == 0) { er++; }
    if (data.akteri == undefined || data.akteri.length == 0) { er++; }
    if (data.zanar == undefined || data.zanar.length == 0) { er++; }
    if (data.oscar == undefined) { er++; }

    if (er == 0) {
        mFilmovi.save({...data, user_id: req.user.id})
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
    if (data.ime == undefined || data.ime.length == 0) { er++; }
    if (data.rezija == undefined || data.rezija.length == 0) { er++; }
    if (data.godina == undefined || data.godina.length == 0) { er++; }
    if (data.akteri == undefined || data.akteri.length == 0) { er++; }
    if (data.zanar == undefined || data.zanar.length == 0) { er++; }
    if (data.oscar == undefined) { er++; }

    if (er == 0) {
        mFilmovi.replace(req.params.id, data)
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

    mFilmovi.replace(req.params.id, data)
        .then(() => {
            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send(err);
        });

}

const remove = (req, res) => {
    mFilmovi.remove(req.params.id)
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
    remove,
    update
}