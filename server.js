const http = require("http");
const fs = require('fs');
var qs = require('querystring');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {

  
    let url = req.url;
    if(url==="/register/done")
    {
        registerDoneHandler(req,res);
    }
    if(url==="/register")
    {
        registerHandler(req,res);
    }
    else
    if( url.split("/")[1] === "public" ) {
        handlePublic(url, req, res)  
    }
    else {
        let html = fs.readFileSync("./index.html");
        res.setHeader("Content-type", "text/html");
        res.statusCode = 200;
        res.end(html);
    }
};

function handlePublic(url, req, res) {
    let file = fs.readFileSync("./" + url);
    res.end( file );
}

function registerDoneHandler(req,res)
{    
    if (req.method == 'POST') 
        var body = '';

        req.on('data', function (data) {
            body += data;});

        req.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post);
});
}
function registerHandler(req,res)
{
    let html = fs.readFileSync("./public/html/register.html");
    res.setHeader("Content-type", "text/html");
    res.statusCode = 200;
    res.end( html );
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    
});