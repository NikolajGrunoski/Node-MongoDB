var mongoose = require('mongoose');

var Product = mongoose.model(
    'products',
    new mongoose.Schema({
        name: String,
        type: String,
        description: String,
        date: Date,
        price: String,
        user_id: String,
    })
);

const getAll = (q, sort) => {
    return new Promise((success, fail) => {
        Product.find(q, {}, { sort: sort }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success();
        })

    });
}

const getOne = (id, userID) => {
    return new Promise((success, fail) => {
        Product.find({ user_id: id, user_id: userID }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data[0]);
        });
    });
};

const save = (data) => {
    return new Promise((success, fail) => {
        var p = new Promise(data);
        p.save(data, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const remove = (id) => {
    return new Promise((success, fail) => {
        Product.findByIdAndDelete(id, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};

const replace = (id, data) => {
    return new Promise((success, fail) => {
        Product.findByIdAndUpdate(id, data, err => {
            if (err) {
                return fail(err);
            }
            return success();
        });
    });
};






module.exports = {
    getAll,
    getOne,
    save,
    remove,
    replace
}