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
    if(!req.body) return response.sendStatus(400);
    var collection = db.collection("VAD_table");
    var table_data = req.body;
    collection = table_definition(table_data, collection, 'VAD', res, false);
    
})


MongoClient.connect('mongodb://127.0.0.1:27017/diagrams', function (err, database) {
    if(err) {
        return console.log(err);
    }
    // console.log(database);
    db = database;
    // console.log(database.options);
    // console.log(database.topology);
    app.listen(3000);
})



var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/views"));


app.post("/VAD", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("VAD_table");
    var table_data = request.body;
    collection = table_definition(table_data, collection, 'VAD', response, true);
});


// function update_table(table_data, name_table) {
//     let collection_api = db.collection('VAD_table');
//     let document = collection_api.findOne({name: name_table});
//     console.log(document);
//     return true;
// }

app.get('/circle/%D0%9A%D0%A1', function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var collection = db.collection("KS_table");
    var table_data = req.body;
    collection = update_database(table_data, collection, 'KS', res, true);
});

app.post("/KS", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("KS_table");
    var table_data = request.body;
    collection = update_database(table_data, collection, 'KS', response, true);

    // if(!request.body) return response.sendStatus(400);
    // var collection = db.collection("KS_first_table");
    // var user = request.body;
    // collection.update({'_id': 'KS_first_table'}, {'_id': 'KS_first_table', user});

    // collection.find().forEach(function(doc) {
    //     call_table('KS', response, doc);
    // });
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
    collection.insert({'_id': 'OSKS_first_table'});

    // collection.update({'_id': 'KS_first_table'}, {'_id': 'KS_first_table', user});

    collection.find().forEach(function(doc) {
        call_table('OSKS', response, doc);
    });
});



function call_table(adress, res, value) {
    // var line = '';
    // var dictionary = value['user'];
    // var arr = [];
    // for (var key in dictionary) {
    //     arr.push(key);
    // }
    // var array_value = [];
    // for (var value in arr) {
    //     line += dictionary[arr[value]] + ' ';
    //     array_value.push(dictionary[arr[value]]);
    // }
    // res.render(adress, { array_value: array_value, arr: arr });

    var final = {};
    var final_array = [];
    for (var key in value)
    {
        if (key != 'name' && key != '_id') {
            var arr = [];
            for (var new_key in value[key]) {
                arr.push(new_key);
            }
            var array_value = [];
            for (var i in arr) {
                var dictionary = value[key];
                array_value.push(dictionary[arr[i]]);
            }
            final_array.push([arr, array_value]);
        }
    }
    console.log(final);
    final = {first_table: final_array[0], name_page: adress};
    console.log(final);
    res.render(adress, final);


}

function call_two_table(adress, res, value) {
    var final = {};
    var final_array = [];
    for (var key in value)
    {
        if (key != 'name' && key != '_id') {
            var arr = [];
            for (var new_key in value[key]) {
                arr.push(new_key);
            }
            var array_value = [];
            for (var i in arr) {
                var dictionary = value[key];
                array_value.push(dictionary[arr[i]]);
            }
            final_array.push([arr, array_value]);
        }
    }
    final = {first_table: final_array[0], second_table: final_array[1], name_page: adress};
    res.render(adress, final);
}

function table_definition(table_body, collection, name_page, response, flag) {
    var ids;
    var first_table;
    var second_table;
    var id;
    // table_body = { 'VAD_second_table_2_1': '98', 'VAD_second_table_2_2': '56', 'VAD_second_table_2_3': '356'};
    collection.find().forEach(function(doc) {
        first_table = doc[name_page + '_first_table'];
        second_table = doc[name_page + '_second_table'];
        ids = name_page + '_table';
        id = doc['_id'];
    });
    setTimeout(function () {
        if (flag) {
            if ((Object.keys(table_body)[0]).indexOf('first') !== -1) {
                collection.save({ 
                '_id': id, name: ids, 'VAD_first_table': table_body, 
                'VAD_second_table': second_table });
            }
            else {
                collection.save({ 
                    '_id': id, name: ids, 'VAD_first_table': first_table, 
                    'VAD_second_table': table_body });
                // collection.updateOne({'name': ids}, {
                //     'name': ids, 'VAD_first_table': first_table,
                //     'VAD_second_table': table_body
                // });
            }
        }
    }, 1000);
    setTimeout(function () {
        collection.find().forEach(function(doc) {
            setTimeout(function () {
                call_two_table('VAD', response, doc);
            }, 1000);
        })}, 1000);
    return collection;
}



function update_database(table_body, collection, name_page, response, flag) {
    var ids;
    var id;
    var key = name_page + 'first_table';
    collection.find().forEach(function(doc) {
        ids = name_page + '_table';
        id = doc['_id'];
    });
    // table_body = { 'KS_first_table_2_1': '98', 'KS_first_table_2_2': '56', 'KS_first_table_2_3': '356'};
    console.log(flag);
    console.log(table_body);
    setTimeout(function () {
        if (flag) {
            console.log('Мы зашли сюда');
            collection.save({ 
            '_id': id, name: ids, 'first_table': table_body });
        }
    }, 1000);
    setTimeout(function () {
        collection.find().forEach(function(doc) {
            console.log(doc);
            setTimeout(function () {
                call_table(name_page, response, doc);
            }, 1000);
        })}, 1000);
    return collection;
}