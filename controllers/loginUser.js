const User = require("../database/models/User");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            console.log("User logged in");
            req.session.userId = user._id;
            res.redirect("/");
        } else {
            res.redirect("/auth/login");
        }
    } else {
        res.redirect("/auth/login");
    }
};