/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    myth = require('myth'),
    fs = require('fs'),
    methodOverride = require('method-override'),
    httpProxy = require('http-proxy'),
    request = require('request'),
    colors = require('colors');

function reportProxy(req, url){
    console.log('proxying', req.originalUrl.blue ,'to', url.magenta);
}

function cacheIt(){
    console.log(arguments)
}

// all environments
app.set('port', process.argv[2] || process.env.PORT || 3000);
app.use(methodOverride());

app.get("*.css", function(req, res) { //*.css
    var path = __dirname + req.url;
    fs.readFile(path, "utf8", function(err, data) {
        res.header("Content-type", "text/css");
        if (err) {
            console.error("Yo dawg, I heard you like files that don't exist. ", err);
            res.send("");
            return;
        }
        try {
            res.send(myth(data));
        } catch (e) {
            console.log(e);
            res.send(data);
        }
    });
});

app.get('/jobsearch/:description/:location', function(req, res){
    var url = 
        [
            "http://service.dice.com/api/rest/jobsearch/v1/simple.json",
            "?text=",
            req.params.description,
            "&city=",
            req.params.location,
            "&sort=",
            1
        ].join("")

    reportProxy(req, url);

    req.pipe(request(url)).pipe(res);
})

app.get('/authenticjobs/', function(req, res){
    var url = 
        [
            "http://www.authenticjobs.com/api/",
            "?api_key=", 
            req.query.api_key,
            "&method=",
            req.query.method,
            "&format=",
            req.query.format
        ];

    if(req.query.keywords){
        url.push("&keywords=", req.query.keywords);
    }
    if(req.query.location){
        url.push("&location=",req.query.location);
    }
    if(req.query.perpage){
        url.push("&perpage=",req.query.perpage);
    }
    if(req.query.page){
        url.push("&page=",req.query.page);
    }
    if(req.query.sort){
        url.push("&sort=",req.query.sort);
    }

    url = url.join("");

    reportProxy(req, url);

    req.pipe(request(url)).pipe(res);
})

app.use(express.static(path.join(__dirname, '')));

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});