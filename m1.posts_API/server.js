const http = require('http');
const fs = require('fs');
const url = require('url');

// load posts data from JSON file
let postsData;
fs.readFile('data/posts.json', function (err, data) {
    postsData = JSON.parse(data);
});

// load posts data from JSON file
let commentsData;
fs.readFile('data/comments.json', function (err, data) {
    commentsData = JSON.parse(data);
});

// pathname - can be of the following forms: /posts, /posts/1, /posts/1/comments
// query - can be of the following forms: '', userId=1
// output -  Array of data Objects / Data object
function getPosts(pathname, query) {
    switch (pathname.split('/').length) {
        case 2: // In case there is one '/' Like "/posts"
            return PostsPathWitheOneBackslash(pathname, query);
        case 3: // In case there are two '/' Like "/posts/1"
            return PostsPathWitheTwoBackslash(pathname, query);
        case 4: // In case there are three '/' Like "/posts/1/comments"
            return PostsPathWitheThreeBackslash(pathname, query);
    }
}

function PostsPathWitheOneBackslash(pathname, query) {
    if (query === null) {
        return postsData;
    }
    else {
        if (query.split('=')[0] === 'userId') {
            let userId = Number(query.split('=')[1]);

            if (userId < 1 || userId > 10) { // Prevent array index out of range
                return [];
            }

            let posts = [];
            for (let indx = 0; indx < postsData.length; indx++) {
                if (postsData[indx].userId === userId) {
                    posts.push(postsData[indx]);
                }
            }
            return posts;
        }
        else { // Other option is 'search' (/posts?search=dinosaur)
            let searchWord = query.split('=')[1];
            let posts = [];
            for (let indx = 0; indx < postsData.length; indx++) {
                if (postsData[indx].title.indexOf(searchWord) >= 0
                    || postsData[indx].body.indexOf(searchWord) >= 0) {
                    posts.push(postsData[indx]);
                }
            }
            return posts;
        }
    }
}

function PostsPathWitheTwoBackslash(pathname, query) {
    const index = Number(pathname.split('/')[2]);

    if (index < 1 || index > 100) { // Prevent array index out of range
        return [];
    }

    return (postsData[index - 1]);
}

function PostsPathWitheThreeBackslash(pathname, query) {
    const postId = Number(pathname.split('/')[2]);

    if (postId < 1 || postId > 100) { // Prevent array index out of range
        return [];
    }

    return commentsAssociatedToPostId(postId);
}

// pathname can be only of the following form: /comments?postId=1
function getComments(pathname, query) {
    let postId = Number(query.split('=')[1]);

    if (postId < 1 || postId > 100) { // Prevent array index out of range
        return [];
    }

    return commentsAssociatedToPostId(postId);
}

function commentsAssociatedToPostId(postId) {
    let comments = [];
    for (let indx = 0; indx < commentsData.length; indx++) {
        if (commentsData[indx].postId === postId) {
            comments.push(commentsData[indx]);
        }
    }
    return comments;
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
            responseData = getComments(reqUrl.pathname, reqUrl.query);
            break;
    }
    return responseData;
}

const server = http.createServer(function (req, res) {
    const responseData = getDataByURL(req.url);
    // stringify and add 2 space to end of line - so it will be displayed well on browser
    const prettyJSONString = JSON.stringify(responseData, null, 2);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(prettyJSONString);
    res.end();
});

// open and listen to port 8080
server.listen(8080, function () {
    console.log('API is available at http://localhost:8080');
    console.log('Try: http://localhost:8080/posts');
});

