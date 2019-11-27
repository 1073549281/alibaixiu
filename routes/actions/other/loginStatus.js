module.exports = async(req, res) => {
    if (req.session && req.session.userInfo) {
        res.send('var isLogin = true ; var userId = "' + req.session.userInfo._id + '"')
    } else {
        res.send('var isLogin = false')
    }
};