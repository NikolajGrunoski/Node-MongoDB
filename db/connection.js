const mongoose = require('mongoose');

const init = () => {
    mongoose.connect(
    'mongodb+srv://dev:DEV123!@cluster0-6k5ja.mongodb.net/videoteka?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })

    .then(res => {
        // console.log(res);
    })
    .catch(err => {
        console.log(err)
    });
}

module.exports = {
    init
}