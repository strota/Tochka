var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient;
var db;

app.set('view engine', 'ejs');

var artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Deep Purple'
    }
];
app.get('/artists', function (req, res) {
    db.collection('artists').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})

app.post('/artists', function (req, res) {
    var artist = {
        name: req.body.name
    };

    db.collection('artists').insert(artist, (err, result) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(artist);
    })
})

app.put('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    });
    artist.name = req.body.name;
    res.send(artist);
})

app.delete('/artists/:id', function (req, res) {
    artists = artists.filter(function (artist) {
        return artist.id !== Number(req.params.id)
    })
    res.sendStatus(200);
})

app.get('/', function (req, res) {
    res.render('index');
})

app.get('/diagrams', function (req, res) {
    res.render('diagramm');
})

app.get('/circle/%D0%92%D0%AD%D0%94', function (req, res) {
    res.render('VAD');
})


app.get('/circle/%D0%9E%D0%BF%D0%B5%D1%80%D0%BE', function (req, res) {
    res.render('Opero');
})
//%D0%9A%D0%A1

app.get('/circle/%D0%9A%D0%A1', function (req, res) {
    res.render('KS');
})
//%D0%9E%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD%20%D0%BE%D1%84%D0%B8%D1%81

app.get('/circle/%D0%9E%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD%20%D0%BE%D1%84%D0%B8%D1%81', function (req, res) {
    res.render('Online-ofice');
})

app.get('/circle/%D0%A1%D0%92%D0%A1', function (req, res) {
    res.render('SVS');
})

app.get('/circle/%D0%9E%D0%9F%D0%9A', function (req, res) {
    res.render('OPK');
})

app.get('/circle/%D0%9E%D0%A1%D0%9A%D0%A1', function (req, res) {
    res.render('OSKS');
})

app.get('/circle/%D0%A1%D0%97%D0%9A', function (req, res) {
    res.render('SZK');
})

app.get('/circle/%D0%A0%D0%B5%D0%BA%D1%80%D1%83%D1%82%D0%B8%D0%BD%D0%B3', function (req, res) {
    res.render('Rekr');
})

// app.listen(3000);

MongoClient.connect('mongodb://127.0.0.1:27017/diagrams', function (err, database) {
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(3000);
})


app.get('/artists', function (req, res) {
    db.collection('artists').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })
})
//
// app.post('/artists', function (req, res) {
//     var artist = {
//         name: req.body.name
//     };
//
//     db.collection('artists').insert(artist, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(artist);
//     })
// })

