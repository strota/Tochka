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