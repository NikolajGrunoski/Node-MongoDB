const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dev:DEV123!@cluster0-6k5ja.mongodb.net/videoteka?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        // console.log(res);
    })
    .catch(err => {
        console.log(err)
    });

// const Filmovi = mongoose.model(
//     'filmovi',
//     new mongoose.Schema({
//         ime: String,
//         godina: Date,
//         zanar: [String],
//         rezija: String,
//         oscar: Boolean,
//         akteri: [String]
//     },
//         {
//             collection: 'filmovi'
//         }
//     )
// );

// var f = new Filmovi({
//     ime: 'AAA',
//     godina: new Date('2019-11-11T19:30:00Z'),
//     zanar: 'BBB',
//     rezija: 'Test test',
//     oscar: false,
//     akteri: ['aaa bbb']
// });

// f.save(err => {
//     if (err) {
//         console.log('could not save record')
//     }
// });


// Filmovi.find({}, (err, data) => {
//     if (err) {
//         console.log('ERROR');
//     }
//     console.log(data);
// });


// console.log('end');


const Klient = mongoose.model(
    'klient',
    new mongoose.Schema({
        ime: String,
        prezime: String,
        telefon: String,
        email: String,
        lozinka: String,
        lokacija: {
            ulica: String,
            broj: String,
            stan: String,
            grad: String,
            drzava: String,
            zip: String,
            gps: {
                lon: Number,
                lat: Number
            }
        },
        zanrovi: [String],
        created: Date,
        modified: Date
    },
    {
        collection: 'klienti'
    })
);

var k = new Klient({
    ime: "Janko",
    prezime: "Stanko",
    telefon: "+389078954568",
    email: "janko.stankovski@gmail.com",
    lozinka: "jankojadiburek",
    lokacija: {
        ulica: 'nekoja ulica',
        broj: "10a",
        stan: "3/1",
        grad: "Skopje",
        drzava: "Makedonija",
        zip: "1000",
        gps: {
            lon: 14.4,
            lat: 11.2
        }
    },
    zanrovi: ['komedija', 'akcija', 'pornic'],
    created: new Date(),
    modified: new Date()
});

// k.save(err => {
//     if(err){
//         console.log('could not save klient')
//         return;
//     }
//     console.log('save successfull')
// });

Klient.find({'lokacija.grad': 'Skopje', zanrovi: 'komedija'}, (err, data) => {
    if (err) {
        console.log('could not save klient');
        return;
    }
    // console.log(data);
    data.forEach((k,i) => {
        console.log(k.ime, ' ', k.prezime, ' ', k.email);
    })

});