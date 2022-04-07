var http = require("http")
var url = require("url")

var router = require("./modules/13_router")

http.createServer(function(req, res){
    //res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"})
    //res.writeHead(200, {"Content-Type" : "images/jpeg"})
    if(req.url !== "/favicon.ico"){
        var pathname = url.parse(req.url).pathname.replace(/\//, ""); // 可以透過 替換方法replace() 把斜槓/去掉
        //console.log(pathname)

        //異常處理
        // 當 router 打印該路由的時候，我們可以通過 try{}catch(){} 的方法來作出異常處理
        try { // try 可以作出異常處理，當我們輸入的路徑不存在時，可以 catch 住這個異常作出特殊的處理
            router[pathname](req,res) // 如果是正常路由，就直接顯示
        }catch(err){
            router["home"](req,res) //但是當不是正常的路由，是一個不存在的路由，我們需要生成一個默認的路由，我們可以設置回到我們的 home頁面
        }
        
    }
    // res.end() // 使用 res.end()，是因為有它才可以停止監聽
}).listen(8000)

console.log("Server running at http://localhost:8000")