const mongoose = require('mongoose');
const uri = 'mongodb+srv://{username}:{password}@{host}/{dbname}?retryWrites=true&w=majority'

const init = () => {
    mongoose.connect(
    'mongodb+srv://dev:DEV123!@cluster0-6k5ja.mongodb.net/videoteka?retryWrites=true&w=majority',
    parseCString(config),
    { useNewUrlParser: true, useUnifiedTopology: true })

    .then(res => {
        // console.log(res);
    })
    .catch(err => {
        console.log(err)
    });
}

const parseCString = (config) => {
    var cs = uri.replace('{username}', config.username);
    cs = uri.replace('{pasword}', config.pasword);
    cs = uri.replace('{host}', config.host);
    cs = uri.replace('{dbname}', config.dbname);
}

module.exports = {
    init
}