//var videoshow = require('videoshow')
const axios = require('axios');
//const express = require('express')
const amqp = require('amqplib/callback_api');
const { response } = require('express');


//const app = express();
/*const port = 8001;

const conn_options = {
  server:     'http://api:5000',

  get_all:    '/rest/api/v1/file/all',
  api_path:   '/rest/api/v1/file'
};*/


amqp.connect('amqp://0.0.0.0', function(error0, connection) {
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


            var images;
            var video;
            
            axios
              .get(`http://127.0.0.1:5000/rest/api/v1/file/all`, {
              })
              .then(res => res.blob())
              .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                console.log(imageObjectURL);
              })
              .catch(error => {
                console.error(error)
              })

              axios
              .get(`http://127.0.0.1:5000/rest/api/v1/file?name=${video_name}`, {
              })
              .then(res => {
                console.log(`statusCode: ${res.status}`)
                video = res.data;
              })
              .catch(error => {
                console.error(error)
              })

              if (video == null)
              {
                console.log("Video is null");
              }



        }, {
            noAck: true
        });
    });
});


/*

app.get('/generate', (req, res)=>{
  axios.get(conn_options.server + conn_options.get_all)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
*/
/*
var images = [
  'Step 0.png',
  'Step 1.png',
  'Step 2.png',
  'Step 3.png',
  'Step 4.png'
]

var videoOptions = {
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

videoshow(images, videoOptions)
  .save('video.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })*/