const http = require("http");
const fs = require("fs");


const host = 'localhost';
const port = 8000;

fs.readFile('./webserver.html', function (error, html) {
    if (error) {
        throw error;
    }
    http.createServer(function(req, res) {
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);  
        res.end("Done");
    }).listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
});
