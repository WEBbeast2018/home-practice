const http = require('http');
const fs = require('fs');
const url = require('url');

// load posts data from JSON file
let postsData;
fs.readFile('data/posts.json', function (err, data) {
    postsData = JSON.parse(data);
});

 // pathname - can be of the following forms: /posts, /posts/1, /posts/1/comments
 // query - can be of the following forms: '', userId=1
 // output -  Array of data Objects / Data object
function getPosts(pathname, query) {
    // TODO: enter logic here using pathname, query
    return postsData;
}


 // param {string} requestURL - url (without hostname:port)
 // output: Array of data Objects / Data object
function getDataByURL(requestURL) {
    const reqUrl = url.parse(requestURL);
    const endPoint = reqUrl.pathname.split('/')[1];
    let responseData = [];

    switch (endPoint) {
        case 'posts':
            responseData = getPosts(reqUrl.pathname, reqUrl.query);
            break;
        case 'comments':
            //TODO
            break;
    }
    return responseData;
}

const server = http.createServer(function (req, res) {
    const responseData = getDataByURL(req.url);
    // stringify and add 2 space to end of line - so it will be displayed well on browser
    const prettyJSONString = JSON.stringify(responseData, null, 2);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(prettyJSONString);
    res.end();
});

// open and listen to port 8080
server.listen(8080, function () {
    console.log('API is available at http://localhost:8080');
    console.log('Try: http://localhost:8080/posts');
});

