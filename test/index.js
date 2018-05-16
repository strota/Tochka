var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    console.log("URL страницы: " + req.url);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    var value = fs.createReadStream(__dirname + '/index.html', 'utf8');
    value.pipe(res)
})

server.listen(3000, '127.0.0.1');
console.log("Мы отслеживаем порт 3000");


app.post("/VAD", urlencodedParser, function (request, response) {
    // console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    var collection = db.collection("VAD_first_table");
    var user = request.body;
    // db.collection("VAD_first_table").remove();
    console.log(db.collection("VAD_first_table"));
    console.log(collection);
    // collection.findOne({'_id': '5aeb1c8611848d2624bd1aba'}, function(err, doc){
    //
    //     console.log(doc);
    // });
    collection.findOne(function(err, doc){
        console.log('- - - - - - - - - - - - - - - - -')
        console.log(doc);
        db.close();
    });
    // var result = collection.find();
    // console.log(result);

    collection.insertOne(user, function(err, result){
        if(err){
            return console.log(err);
        }
        console.log('_______________________');
        // console.log(result);
        console.log(result.ops);
        db.close();
    });
    var value = collection.find({ _id: '5aeb140404e8a428e4c61ddc' });
    console.log(value.collation());
    console.log('!!!!');
    response.render('VAD');
});










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


<!--<%= for (var i = 0; i < message.length; i++) { %>-->
<!--<div class="new_class">-->
<!--<%= message[i] %>-->
    <!--</div>-->
<!--<%= } %>-->






    <!--<form action="/VAD" method="post">-->
    <!--<table id="VAD_first_table1">-->
    <!--<tbody>-->
    <!--<% var count = 0;-->
    <!--var count_line = 1;-->
    <!--%>-->
    <!--<tr>-->
    <!--<td>Даты</td>-->
    <!--<% array_value.forEach(function (item) {-->
    <!--if (count % (array_value.length / 3) == 0 && count != 0) {%>-->
    <!--</tr><tr>-->
    <!--<% if (count_line == 1) { %>-->
    <!--<td>> 1 минуты</td>-->
<!--<% count_line += 1;-->
<!--} else { %>-->
<!--<td>Не дозвонились</td>-->
<!--<% }}-->
<!--console.log(arr);%>-->
<!--<td><input type="text" name=<%= arr[count] %> value=<%= item %>></td>-->
    <!--<% count += 1 }); %>-->
    <!--</tbody>-->
    <!--</table>-->
    <!--<br>-->
    <!--<input type="submit" value="Сохранить таблицу" onclick="save()">-->
    <!--</form>-->
    <!--<br>-->
    <!--<form>-->
    <!--<input type="button" value="Добавить столбец" onclick="correction('VAD_first_table1')">-->
    <!--</form>-->





    <form action="/VAD" method="post">
    <table id="VAD_second_table">
    <tbody>
    <% var count = 0;
    var count_line = 1;
%>
<tr>
    <td>Даты</td>
    <% array_value.forEach(function (item) {
        if (count % (array_value.length / 3) == 0 && count != 0) {%>
        </tr><tr>
            <% if (count_line == 1) { %>
            <td>> 1 минуты</td>
                <% count_line += 1;
            } else { %>
            <td>Не дозвонились</td>
                <% }} %>
    <td><input type="text" name=<%= arr[count] %> value=<%= item %>></td>
        <% count += 1 }); %>
</tbody>
    </table>
    <br>
    <input type="submit" value="Сохранить таблицу" onclick="save()">
        </form>
        <br>
        <form>
        <input type="button" value="Добавить столбец" onclick="correction('VAD_second_table')">
        </form>