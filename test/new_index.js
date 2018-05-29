var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require('mongodb').MongoClient;
var db;
let responseCurrent = null;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');


app.get('/', function (request, response) {
    response.render('index');
})

app.get('/diagrams', function (request, response) {
    response.render('diagramm');
})


MongoClient.connect('mongodb://127.0.0.1:27017/diagrams', function (err, database) {
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(3000);
})



var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/views"));


app.get('/circle/%D0%92%D0%AD%D0%94', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("VAD_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'VAD_table' });
    t1.then((result) => {
        response.render('VAD', {first_table_body: 
            result['first_table'], 
            second_table_body: result['second_table'], 
            name_page: 'VAD'});
    }); 
})

app.post("/VAD", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("VAD_table");
    var table_data = request.body;
    collection = update_database_two(table_data, collection, 'VAD', response);
});

app.get('/circle/%D0%9A%D0%A1', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("KS_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'KS_table' });
    t1.then((result) => {
        response.render('KS', {table_body: result['first_table'], name_page: 'KS'});
    });
});

app.post("/KS", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("KS_table");
    var table_data = request.body;
    update_database(table_data, collection, 'KS', response);
});



app.get('/circle/%D0%9E%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD%20%D0%BE%D1%84%D0%B8%D1%81', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("OnlineOffice_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'Online-office_table' });
    t1.then((result) => {
        console.log(result);
        response.render('Online-office', {table_body: result['first_table'], name_page: 'Online-office'});
    });
});

app.post("/Online-office", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("OnlineOffice_table");
    var table_data = request.body;
    // console.log(table_data);
    update_database(table_data, collection, 'Online-office', response);
    // response.render('Online-office');
});


app.get('/circle/%D0%9E%D0%BF%D0%B5%D1%80%D0%BE', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("Opero_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'Opero_table' });
    t1.then((result) => {
        response.render('Opero', {first_table_body: 
            result['first_table'], 
            second_table_body: result['second_table'], 
            name_page: 'Opero'});
    });
})

app.post("/Opero", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("Opero_table");
    var table_data = request.body;
    collection = update_database_two(table_data, collection, 'Opero', response);
    // response.render('Opero');
});

app.get('/circle/%D0%A1%D0%92%D0%A1', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("SVS_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'SVS_table' });
    t1.then((result) => {
        console.log(result);
        response.render('SVS', {table_body: result['first_table'], name_page: 'SVS'});
    });
    // response.render('SVS');
});

app.post("/SVS", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("SVS_table");
    var table_data = request.body;
    // console.log(table_data);
    update_database(table_data, collection, 'SVS', response);
    // response.render('SVS');
});

app.get('/circle/%D0%9E%D0%A1%D0%9A%D0%A1', function (request, response) {
    response.render('OSKS');
});

app.post("/OSKS", urlencodedParser, function (request, response) {
    response.render('OSKS');
});

app.get('/circle/%D0%9E%D0%9F%D0%9A', function (request, response) {
    response.render('OPK');
});

app.post("/OPK", urlencodedParser, function (request, response) {
    console.log('Мы зашли в POST');
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("OPK_table");
    var table_data = request.body;
    console.log(table_data);
    // collection.remove();
    collection = update_database_two(table_data, collection, 'OPK', response);
    // response.render('OPK');
});

app.get('/circle/%D0%A1%D0%97%D0%9A', function (request, response) {
    // response.render('SZK');
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("SZK_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'SZK_table' });
    t1.then((result) => {
        response.render('SZK', {first_table_body: 
            result['first_table'], 
            second_table_body: result['second_table'], 
            name_page: 'SZK'});
    });
});

app.post('/circle/SZK', urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("SZK_table");
    var table_data = request.body;
    collection = update_database_two(table_data, collection, 'SZK', response);
});

app.get('/circle/%D0%A0%D0%B5%D0%BA%D1%80%D1%83%D1%82%D0%B8%D0%BD%D0%B3', function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("Rekr_table");
    var table_data = request.body;
    let t1 = collection.findOne({name: 'Rekr_table' });
    t1.then((result) => {
        response.render('Rekr', {first_table_body: 
            result['first_table'], 
            second_table_body: result['second_table'], 
            name_page: 'Rekr'});
    });
});

app.post('/Rekr', urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("Rekr_table");
    var table_data = request.body;
    collection = update_database_two(table_data, collection, 'Rekr', response);
});










function update_database(table_body, collection, name_page, res) {
    // collection.remove();
    // table_body = { 'KS_first_table_2_1': '98', 'KS_first_table_2_2': '56', 'KS_first_table_2_3': '356'};
    collection.insert({ first_table: table_body, name: name_page + '_table' });
    let t1 = collection.findOne({name:name_page + '_table' });
    t1.then((result) => {
        result.first_table = table_body;
        collection.save(result, {}, (savedData) => {});
        res.render(name_page, {table_body: result.first_table, name_page: name_page});
    });
}

function update_database_two(table_body, collection, name_page, response) {
    // collection.remove();
    // var second_table = {Rekr_second_table_2_1: '0', Rekr_second_table_2_2: '0', Rekr_second_table_2_3: '0', Rekr_second_table_2_4: '0'};
    // collection.insert({ first_table: table_body, second_table: second_table, name: name_page + '_table' });
    let t1 = collection.findOne({name:name_page + '_table'  });
    console.log(table_body[0]);
    var name_table = (Object.keys(table_body)[0]).split('_')[1] + '_table';
    t1.then((result) => {
        result[name_table] = table_body;
        collection.save(result, {}, (savedData) => { });
        console.log(result['first_table']);
        console.log('Тут всё ок!');
    //     response.render('OPK', {first_table_body:
    //     { OPK_first_table_2_1: 'Декабрь',
    //       OPK_first_table_2_2: 'Декабрь',
    //       OPK_first_table_2_3: 'Декабрь',
    //       OPK_first_table_2_4: 'Декабрь',
    //       OPK_first_table_2_5: 'Декабрь',
    //       OPK_first_table_2_6: 'Декабрь',
    //       OPK_first_table_2_7: 'Декабрь' },
    //    second_table_body:
    //     { OPK_second_table_2_1: 'Декабрь',
    //       OPK_second_table_2_2: 'Декабрь',
    //       OPK_second_table_2_3: 'Декабрь',
    //       OPK_second_table_2_4: 'Декабрь',
    //       OPK_second_table_2_5: 'Декабрь',
    //       OPK_second_table_2_6: 'Декабрь' },
    //        name_page: name_page })
        response.render(name_page, {first_table_body: 
            result['first_table'], 
            second_table_body: result['second_table'], 
            name_page: name_page});
    });
}