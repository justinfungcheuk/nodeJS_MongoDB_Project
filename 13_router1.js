var file = require("./modules/file")

module.exports = {
    home: function(req, res){
        res.write("首頁")
    },
    login: function(req, res) {
        res.write("登錄頁面")
    },
    registor: function(req, res){
        res.write("註冊頁面")
    },
    img: function(req, res){
        file.readImg("./images/pet.jpeg", res)
    }
}