module.exports = async (req, res,next) => {
    try {
        if(req.session.userId){
            return res.redirect("/");
        }
        next();
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
};