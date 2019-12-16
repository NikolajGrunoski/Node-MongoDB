const randomstring = require('randomstring');
const fs = require ('fs'); 

const UploadFile = (req, res) => {
    var file = req.files.file;

    if(file.size > 10 * 1024 * 1024){
        return res.status(500).send('File too big');
    }

    var prefix = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });

    file.mv(`./uploads/${prefix}_${file.name}`, err => {
        console.log(err);
        if(err){
            return res.status(500).send('Internal server error');
        }
        return res.status(200).send('ok');
    })

    var allowedTypes = [
        'image/png', 
        'image/jpg', 
        'image/jpeg', 
        'image/pjpeg',
        'image/gif'
    ];

    if(allowedTypes.indexOf(file.minetype) == -1) {
        return res.status(500).send('Filetype not on the list');
    }

    let name = file.name.replace(/ /g, '_');
    let path = `./uploads/${req.user.id}`;
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    file.mv('./uploads/slika.jpg', err => {
        if(err){
            return res.status(500).send('Internal server error');
        }
        return res.status(200).send({
            filename: `${prefix}_${file.name}`});
    });
}

const DownloadFile = (req, res) => {
    let filepath = path.resolve(`${__dirname}/uploads/${req.user.id}/${req.params.filename}`);
    if(false.existsSyc(filepath)) {
        res.sendFile(filepath);
    }else {
        res.status(404).send('Not found');
    }
}

module.exports = {
    UploadFile,
    DownloadFile
}