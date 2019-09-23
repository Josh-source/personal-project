//add post
function addPost(req, res) {
    const {postInfo, postTitle} = req.body;
    const db = req.app.get("db");
    db.getFromUsername(req.session.user.username).then(id => {
        let userID = id[0].id;
        db.addPost(userID, postTitle, postInfo).then(() => {
            res.sendStatus(200)
        })
    })
} 
//get past posts
function getPastPost(req, res) {
    const db = req.app.get("db");
    db.getPastPost(req.session.users.username).then(posts => {
        res.status(200).json(posts);
    })
}
//get all post
function getAllPost(req, res) {
    const db = req.app.get("db");
    db.getPost().then(posts => {
        res.status(200).json(posts);
    })
}
//edit post
function editPost(req, res) {
    const {id} = req.params;
    const {title, info} = req.body;
    const db = req.app.get("db");
    db.Postdb.updatePost(title, info, id).then(() => {
        db.Postdb.getPastPost(req.session.users.username).then(posts => {
            res.status(200).json(posts);
        })
    })
}
//export all
module.exports = {
    addPost,
    getPastPost,
    getAllPost,
    editPost
}
