//add post
function addPost(req, res) {
    const {postInfo, postTitle, url} = req.body;
    const db = req.app.get("db");
    // db.User.getIdFromUsername(req.session.user.username).then(id => {
    //     let userID = id[0].id;
        db.Postdb.addPost(req.session.user.user_id, postTitle, postInfo, url).then(() => {
            res.sendStatus(200)
        })
    // })
} 
//get past posts
function getPastPost(req, res) {
    const db = req.app.get("db");
    db.Postdb.getPastPost(req.session.user.user_id).then(posts => {
        res.status(200).json(posts);
    })
}
//get all post
function getAllPost(req, res) {
    const db = req.app.get("db");
    db.Postdb.getPost(req.session.user.user_id).then(posts => {
        res.status(200).json(posts);
    })
}
//edit post
function editPost(req, res) {
    const {id} = req.params;
    const {title, info} = req.body;
    const db = req.app.get("db");
    db.Postdb.updatePost(title, info, id).then(() => {
        db.Postdb.getPastPost(req.session.user.username).then(posts => {
            res.status(200).json(posts);
        }).catch(() => console.log("sql err"))
    })
}
function deletePost(req, res) {
    const {id} = req.params;
    // const {title, info, url} = req.body;
    // console.log(url);
    const db = req.app.get("db");
    db.Postdb.deletePost(id).then(() => {
        db.Postdb.getPastPost(req.session.user).then(posts => {
            res.status(200).json(posts);
        }).catch(() => console.log("sql err"))
    })
}
//export all
module.exports = {
    addPost,
    getPastPost,
    getAllPost,
    editPost,
    deletePost
}
