require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const axios = require("axios");
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env 
const http = require("http");

// const server=http.createServer(function(req,res){
//     res.end('test');

//controllers
const {registerUser, loginUser} = require("./controllers/bcryptController/authController");
const {addPost, getPastPost, getAllPost, editPost, deletePost} = require("./controllers/postController");

const app = express();


massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Database Connected !");
})

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

app.delete("/api/post/:id", (req, res) => {
    const {id} = req.params;
    const db = req.app.get("db");
    db.Postdb.deletePost(id).then(() => {
        db.Postdb.getPastPost(req.session.user.user_id).then(post => {
            res.status(200).json(post);
        })
    })
})

// server.on(`listening`, function(){
//     console.log('ok, server is running')
// })



app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))