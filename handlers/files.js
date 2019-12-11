const randomstring = require('randomstring');

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

    file.mv('./uploads/slika.jpg', err => {
        if(err){
            return res.status(500).send('Internal server error');
        }
        return res.status(200).send('ok');
    });
}

module.exports = {
    UploadFile
}