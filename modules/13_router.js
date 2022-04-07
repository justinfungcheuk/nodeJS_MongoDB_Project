var file = require("./file")
var url = require("url")
// var queryString = require("querystring") // POST請求 可以通過 queryString 這個模塊獲得

module.exports = {
    
    home: function(req, res){
        file.readFile("./views/home.html", res, req)
    },
    login: function(req, res) {
        var urlObject = url.parse(req.url, true).query; // 引入 url 再通過 url.parse()解析
        //因為是 get方法，所以我們可以直接在控制台打印 . 的內容
        //console.log(urlObject.email) // parse方法 可以把提交過來的字符串轉換成對象，這樣就可以從前端獲取相關內容，再顯示到後端，所以我們需要讀取文件 
        //console.log(urlObject.password)
        //file.readFile("./views/login.html", res, req)

        var post = "" // 定義 post變量，用作存儲字符串
        req.on("data", function(chunk){ // 通過 req 的 on 方法，註冊 data事件，用作獲取頁面上的數據，把這些獲取的數據作內容的拼接，
            post += chunk
        })
        req.on("end", function(){ // 當數據接收完成後，觸發 end事件，
            //var urlObject = queryString.parse(post) // 返回一個 url對象，就可以獲得對象的內容
            //console.log(urlObject.email)
            //console.log(urlObject.password)
            file.postReadFile("./views/login.html", res, req, post)
        })
    
        //file.readFile("./views/login.html", res, req) // 將內容顯示到前台的頁面上
    },
    registor: function(req, res){
        res.write("註冊頁面")
    },
    img: function(req, res){
        file.readImg("./images/pet.jpeg", res)
    }
}