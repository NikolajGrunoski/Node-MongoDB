const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dev:DEV123!@cluster0-6k5ja.mongodb.net/school?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        // console.log(res);
    })
    .catch(err => {
        console.log(err)
    });

const Student = mongoose.model(
    'student',
    new mongoose.Schema({
        first_name: String,
        last_name: String,
        average_grade: Number,
        courses: [String],
        email: String,
        birthday: Date
    },
    {
        collection: "students"
    })
);

var first = new Student({
    first_name: 'Nikolaj',
    last_name: 'Grunoski',
    average_grade: 5,
    courses: ['math', 'gym', 'music', 'english'],
    email: 'nikolaj.grunoski@gmail.com',
    birthday: new Date('1996-04-28T06:00:00Z')
});

var second = new Student({
    first_name: 'Boce',
    last_name: 'Bocevski',
    average_grade: 2,
    courses: ['math', 'gym', 'painting', 'french'],
    email: 'bojan.bocevski@gmail.com',
    birthday: new Date('1995-07-29T06:00:00Z')
});

var third = new Student({
    first_name: 'Ciki',
    last_name: 'Popovski',
    average_grade: 4,
    courses: ['math', 'gym', 'painting', 'french'],
    email: 'stefan.popovski@gmail.com',
    birthday: new Date('1995-09-21T06:00:00Z')
});


// first.save(err => {
//     if (err) {
//         console.log('could not save record');
//         return
//     }
//     console.log('save successfull');
// });
// second.save(err => {
//     if (err) {
//         console.log('could not save record');
//         return
//     }
//     console.log('save successfull');
// });
third.save(err => {
    if (err) {
        console.log('could not save record');
        return
    }
    console.log('save successfull');
});
