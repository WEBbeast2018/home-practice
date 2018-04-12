let http = require('http');
let https = require('https');
let fs = require('fs');
let path = require('path');

const fetch = require("node-fetch");

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'application/image/svg+xml'
};

const port = process.env.PORT || 8080;
const EMPTY = '';

function parseUrl(url) {
  const path = url.split('/');
  const search = url.match(/(\?[\w=]*[^#]*)/);
  return path && {
    pathname: path,
    search: (search != null) ? search[1] : EMPTY,
  }
}

function retrieveResourceById(resource, id) {
  let i = 0;
  let data = new Array();
  resource.forEach(obj => {
    if (obj.id == id) { data[i++] = obj; }
  });
  return data;
}

function retrieveResourceByKey(resource, key, value) {
  let i = 0;
  let data = new Array();
  resource.forEach(obj => {
    if (obj[key] == value) { data[i++] = obj; }
  });
  return data;
}

function serveFile(request, response) {

  let filePath = '.' + request.url;
  if (filePath == './') { filePath = './index.html'; }
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'octet-stream';

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        fs.readFile('./404.html', function (error, content) {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        });
      }
      else {
        response.writeHead(500);
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}

function useApi(request, response) {
  const jsonServer ='https://jsonplaceholder.typicode.com/';
  const resourceLocator = parseUrl(request.url);
  const length = resourceLocator.pathname.length;

  fetch( jsonServer + resourceLocator.pathname[1])
    .then(function (resp) { return resp.json(); })
    .then(function (json) {
      let content = JSON.stringify(json, undefined, 2);
      if (resourceLocator.pathname.length > 2) {
        content = JSON.stringify(retrieveResourceById(json, resourceLocator.pathname[2]), undefined, 2);
      }
      else if (resourceLocator.search != EMPTY) {
        const searchParm = resourceLocator.search.slice(1).split('=');
        content = JSON.stringify(retrieveResourceByKey(json, searchParm[0], searchParm[1]), undefined, 2);
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(content, 'utf-8');
    })
    .catch(function (err) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end(err.code, 'utf-8');
    });
}

http.createServer(function (request, response) {

  const resourceLocator = parseUrl(request.url);
  const length = resourceLocator.pathname.length;
  const extname = String(path.extname(resourceLocator.pathname[length - 1])).toLowerCase();

  if (extname != EMPTY) {
    serveFile(request, response)
  }
  else {
    useApi(request, response)
  }
}).listen(port, function () {
  console.log('Server running at http://localhost:' + port + '/');
});