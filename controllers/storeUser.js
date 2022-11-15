const User = require("../database/models/User");
module.exports = async (req, res) => {
    try {
        User.create(req.body, (error, user)=>{
            res.redirect("/");
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }

}