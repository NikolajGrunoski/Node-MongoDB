const mongoose = require('mongoose');
mongoose.connect('mongodb://dev:****@cluster0-6k5ja.mongodb.net:27017/videoteka', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res =>{
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    });

    const Filmovi = mongoose.model('filmovi', 
        {
            ime: String,
            godina: Date,
            zanar: [String],
            rezija: String,
            oscar: Boolean,
            akteri: [String]

        }
    );

    Filmovi.find((err,data) => {
        if(err){
            console.log('ERROR');
        }
        console.log(data);
    });


console.log('end');
