const bcrypt = require ("bcryptjs");

module.exports = {
    registerUser: function(req, res) {
        const {username, password, email, firstName, lastName} = req.body;
        const db = req.app.get("db");
        db.User.checkForUser(username, email).then(count => {
            if(+count[0].count === 0) {
                bcrypt.hash(password, 12).then(hash => {
                    db.User.registerUser(firstName, lastName, email, username, hash).then(() => {
                        req.session.user = {
                            firstName,
                            lastName,
                            username,
                            email
                        }
                        res.status(200).json(req.session.user);
                    })
                })
            } else {
                res.status(409).json({
                    error: "Username or Email already Exists. Please Log in with your account"
                })
            }
        })
    },
    loginUser: function(req, res) {
        const {username, password} = req.body;
        const db = req.app.get("db");
        db.User.getPasswordFromUsername([username]).then(user => {
            let hash = user[0].password;
            bcrypt.compare(password, hash).then(areSame => {
                if(areSame) {
                    req.session.user = {
                        user_id: user[0].user_id,
                        username,
                        firstName: user[0].first_name,
                        lastName: user[0].last_name,
                        email: user[0].email,
                    }
                    res.status(200).json(req.session.user);
                } else {
                    res.status(401).json({
                        error: "Username or Password incorrect"
                    })
                }
            })
        })
    },
    logOutUser:function (req,res) {
        req.session.destroy();
        return res.sendStatus(200)
    }
}