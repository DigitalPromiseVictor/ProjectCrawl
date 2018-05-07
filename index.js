var Crawler = require("crawler");
var fs = require("fs");
 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log(res.body);
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        done();
    }
});

c.queue({
    uri: 'http://www.google.com',
    // this will override the 'preRequest' defined in crawler
    preRequest: function(options, done) {
        setTimeout(function() {
        console.log(options);
        done();
    }, 1000)
    }
});
 
