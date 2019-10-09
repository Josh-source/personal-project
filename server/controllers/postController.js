//add post
async function addPost(req, res) {
    const {postInfo, postTitle, url} = req.body;
    const db = req.app.get("db");
        await db.Postdb.addPost(req.session.user.user_id, postTitle, postInfo, url).then(() => {
            res.sendStatus(200)
        })
} 
//get past posts
async function getPastPost(req, res) {
    const db = req.app.get("db");
    await db.Postdb.getPastPost(req.session.user.user_id).then(posts => {
        res.status(200).json(posts);
    })
}
//get all post
async function getAllPost(req, res) {
    const db = req.app.get("db");
    await db.Postdb.getPost(req.session.user.user_id).then(posts => {
        res.status(200).json(posts);
    })
}
//edit post
async function editPost(req, res) {
    const {id} = req.params;
    const {title, info} = req.body;
    const db = req.app.get("db");
    await db.Postdb.updatePost(title, info, id).then(() => {
        db.Postdb.getPastPost(req.session.user.username).then(posts => {
            res.status(200).json(posts);
        }).catch(() => console.log("sql err"))
    })
}
async function deletePost(req, res) {
    const {id} = req.params;
    const db = req.app.get("db");
    await db.Postdb.deletePost(id).then(() => {
        db.Postdb.getPastPost(req.session.user).then(posts => {
            res.status(200).json(posts);
        }).catch(() => console.log("sql err"))
    })
}
//UserPage
async function editUser(req,res) {
    const {username, email} = req.body;
    const {user_id} = req.session.user;
    const db = req.app.get("db");
    const updateuser = await db.User.editUser(username, email, user_id)
    res.status(200).json(updateuser);
}

async function getUserPosts(req,res) {
    const {user_id} = req.session.user;
    const db = req.app.get("db");
    const getUserPosts = await db.Postdb.getUserPosts(user_id)
    res.status(200).json(getUserPosts);
}
//export all
module.exports = {
    addPost,
    getPastPost,
    getAllPost,
    editPost,
    deletePost,
    editUser,
    getUserPosts
}
