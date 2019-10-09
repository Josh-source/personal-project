const path = require('path');
require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env 

//socket
const server = require('http').createServer(app)
const sockets = require('socket.io');
const io = sockets(server)

//controllers
const {registerUser, loginUser} = require("./controllers/bcryptController/authController");
const {addPost, getPastPost, getAllPost, editPost, deletePost, editUser, getUserPosts} = require("./controllers/postController");



massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
})

app.use( express.static(`${__dirname}/../build` ) );



app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 24
    }
}));

app.use(express.json());

app.get("/auth/user", (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    }
})
app.post("/auth/register", registerUser)
app.post("/auth/login", loginUser)
app.post("/api/post", addPost)
app.get("/api/users/post", getAllPost)
app.get("/api/user/post", getPastPost)
app.put("/api/post/:id", editPost)
app.delete("/api/post/:id",deletePost)

app.post(`/api/post/:id`,)
//UserPage
app.put("/api/users/", editUser)
app.get("/api/user/posts", getUserPosts)


app.delete("/api/post/:id", (req, res) => {
    const {id} = req.params;
    const db = req.app.get("db");
    db.Postdb.deletePost(id).then(() => {
        db.Postdb.getPastPost(req.session.user.user_id).then(post => {
            res.status(200).json(post);
        })
    })
})
//socket end point

let messages = [];
let username = "";

app.post("/login", (req, res) => {
    req.session.username = req.body.username;
})

io.on("connection", socket => {
    socket.emit("onConnection", {
        message: "Sockets has been connected"
    })
    socket.on("messageSend", data => {
        messages.push({
            message: data.message,
            username: data.username
        });
        io.emit("newMessage", messages)
    })
})
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(SERVER_PORT);
server.timeout = 0;