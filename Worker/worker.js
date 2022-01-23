var videoshow = require('videoshow')
const axios = require('axios');
const amqp = require('amqplib/callback_api');
const { response } = require('express');
var FileReader = require('filereader');
var filereader = new FileReader();
const download = require('image-downloader');
const folderName = "/usr/src/worker/images"

const videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}


var express = require('express');
var app = express();

app.get('/', function (req, res) {
    amqp.connect('amqp://guest:guest@rabbitmq:5672', function(error0, connection) {
      if (error0) {
          throw error0;
      }
      connection.createChannel(function(error1, channel) {
          if (error1) {
              throw error1;
          }

          var queue = 'FileRepository';

          channel.assertQueue(queue, {
              durable: false
          });

          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

          channel.consume(queue, function(msg) {
              console.log(" [x] Received %s", msg.content.toString());

              var message = msg.content.toString();
              var splitted = message.split(";");
              var file_name = splitted[0];
              var video_name = splitted[1];

              var images = [];

              //Get all file names
              axios
                .get(`http://api:5000/rest/api/v1/file/all`, {
                  responeType: 'json',
                  transformResponse: [v => v]
                })
                .then(res => {
                  console.log(`statusCode: ${res.status}`)
                  console.log(`Data is: ${res.data}`)

                  var obj = JSON.parse(res.data);

                  for(var image of Object.values(obj)){
                    //Get images and download them

                    options = {
                      url: `http://api:5000/rest/api/v1/file?name=${image}`,
                      dest: `${folderName}/${image}`
                    }

                    download.image(options)
                        .then(({ filename }) => {
                          console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
                        })
                        .catch((err) => console.error(err))
                    
                        images.push(`/images/${image}`); 
                  }


                  videoshow(images, videoOptions)
                    .save(`${video_name}.mp4`)
                    .on('start', function (command) {
                      console.log('ffmpeg process started:', command)
                    })
                    .on('error', function (err, stdout, stderr) {
                      console.error('Error:', err)
                      console.error('ffmpeg stderr:', stderr)
                    })
                    .on('end', function (output) {
                      console.error('Video created in:', output)
                  })

                  console.log("help");
                })
                .catch(error => {
                  console.error(error)
                })
          }, {
              noAck: true
          });
      });
  });
});

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
 });




