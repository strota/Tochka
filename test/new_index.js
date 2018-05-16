var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient;
var db;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('index');
})

app.get('/diagrams', function (req, res) {
    res.render('diagramm');
})

app.get('/circle/%D0%92%D0%AD%D0%94', function (req, res) {
    // console.log('Ты тут была');
    // var collection = db.collection("VAD_first_table");
    // collection.find().forEach(function(doc) {
    //     console.log('И тут была');
    //     console.log(doc);
    //     call_two_table('VAD', collection, res, doc, doc._id);
    // });
    //
    // var second_collection = db.collection("VAD_second_table");
    // second_collection.find().forEach(function(doc) {
    //     console.log('И тут была');
    //     call_table('VAD', collection, res, doc, doc._id);
    // });
    // res.render('VAD', { array_value: ['0'], arr: ['0'] });
    res.render('VAD');
})


// app.listen(3000);

MongoClient.connect('mongodb://127.0.0.1:27017/diagrams', function (err, database) {
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(3000);
})



var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/views"));


app.post("/VAD", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("VAD_table");
    var user = request.body;
    collection = table_definition(user, collection, 'VAD');
    collection.find().forEach(function(doc) {
        console.log(doc);
        call_two_table('VAD', response, doc);
    });
    response.render("VAD");
});


app.get('/circle/%D0%9A%D0%A1', function (req, res) {
    console.log('Ты тут была');
    var collection = db.collection("KS_first_table");
    collection.find().forEach(function(doc) {
        call_table('KS', res, doc);
    });
});

app.post("/KS", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("KS_first_table");
    var user = request.body;
    collection.update({'_id': 'KS_first_table'}, {'_id': 'KS_first_table', user});

    collection.find().forEach(function(doc) {
        call_table('KS', response, doc);
    });
});



app.get('/circle/%D0%9E%D0%BF%D0%B5%D1%80%D0%BE', function (req, res) {
    res.render('Opero');
    // var collection = db.collection("Opero_first_table");
    // collection.find().forEach(function(doc) {
    //     call_table('Opero', res, doc);
    // });
});

app.post("/Opero", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("Opero_first_table");
    var user = request.body;
    console.log('Сейчас ты в POST')
    collection.insert({'_id': 'Opero_first_table'});
    //
    //
    // collection.update({'_id': 'KS_first_table'}, {'_id': 'KS_first_table', user});

    collection.find().forEach(function(doc) {
        call_table('Opero', response, doc);
    });
});


app.get('/circle/%D0%9E%D0%A1%D0%9A%D0%A1', function (req, res) {
    res.render('OSKS');
})

app.post("/OSKS", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("OSKS_first_table");
    var user = request.body;
    console.log('Сейчас ты в POST')
    collection.insert({'_id': 'OSKS_first_table'});
    //
    //
    // collection.update({'_id': 'KS_first_table'}, {'_id': 'KS_first_table', user});

    collection.find().forEach(function(doc) {
        call_table('OSKS', response, doc);
    });
});



function call_table(adress, res, value) {
    var line = '';
    var dictionary = value['user'];
    var arr = [];
    for (var key in dictionary) {
        arr.push(key);
    }
    var array_value = [];
    for (var value in arr) {
        line += dictionary[arr[value]] + ' ';
        array_value.push(dictionary[arr[value]]);
    }
    console.log(arr);
    console.log(array_value);
    res.render(adress, { array_value: array_value, arr: arr });
}

function call_two_table(adress, res, value) {
    console.log('Ты зашла в call_two_table');
    var arr = [];
    var final = {};
    for (var key in value)
    {
        if (key != '_id') {
            var arr = [];
            console.log(key);
            console.log(value[key]);
            for (var new_key in value[key]) {
                arr.push(new_key);
            }
            var array_value = [];
            for (var i in arr) {
                console.log(i);
                console.log()
                array_value.push(value[key[i]]);
            }
            console.log(arr);
            console.log(array_value);
        }
    }


    // res.render(adress, { array_value: array_value, arr: arr });
    // res.render('VAD');
    // res.render(adress, { array_value: array_value, arr: arr, id: id });
}

function table_definition(table_body, collection, name_page) {
    var first_table;
    var second_table;
    collection.find().forEach(function(doc) {
        first_table = doc[name_page + '_first_table'];
        second_table = doc[name_page + '_second_table'];
    });
    setTimeout(function() {
        var ids = name_page + '_table';
        if ((Object.keys(table_body)[0]).indexOf('first') !== -1) {
            collection.update({'_id': ids}, {
                '_id': ids, 'VAD_first_table': table_body,
                'VAD_second_table': second_table
            });
        }
        else {
            collection.update({'_id': ids}, {
                '_id': ids, 'VAD_first_table': first_table,
                'VAD_second_table': table_body
            });
        }
    }, 1000);
    return collection;
}
