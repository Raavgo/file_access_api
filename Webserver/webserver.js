const http = require("http");
const fs = require("fs");
const axios = require('axios')
const amqp = require('amqplib/callback_api');



const host = '0.0.0.0';
const port = 8000;

fs.readFile('./webserver.html', function (error, html) {
    if (error) {
        throw error;
    }
    http.createServer(function(req, res) {
        if(req.url ==='/upload'){
            console.log("hello");
        }else if (req.url.includes('/sendToQueue')){

          var split = req.url.split('?');

          console.log(split[1]);

          var parsedURL = JSON.parse('{"' + decodeURI(split[1]).replace(/"/g, '\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

          var file_name = parsedURL['file_name'];
          var video_name = parsedURL['video_name'];

            amqp.connect('amqp://guest:guest@rabbitmq:5672', function(error0, connection) {
              if (error0) {
                throw error0;
              }
              connection.createChannel(function(error1, channel) {
                if (error1) {
                  throw error1;
                }
                var queue = 'FileRepository';
                var msg = `${file_name}.jpg` + `;` + `${video_name}`;
            
                channel.assertQueue(queue, {
                  durable: false
                });
            
                channel.sendToQueue(queue, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
              });
            });
          }else {
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end("Done");
        }
    }).listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
});
