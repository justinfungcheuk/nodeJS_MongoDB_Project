var fs = require("fs")
var queryString = require("querystring")

module.exports = {
  readFile: function (file, res, req){
    fs.readFile(file, "utf-8", function (err, data){
      if(err) throw err
      res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
      res.write(data);
      res.end()
    })
  },
  postReadFile: function(file, res, req, post){
    var urlObject = queryString.parse(post)
    var array = ["email", "password"]
    var reg;

    fs.readFile(file, "utf-8", function(err, data){
      if(err) throw err
      res.writeHead(200, {"Content_Type" : "text/html; charset=utf-8"})
      
      for(var i = 0; i < array.length; i++){
        reg = new RegExp("{" + array[i] + "}", "gi")
        data = data.replace(reg, urlObject[array[i]])
      }

      if(urlObject.email && urlObject.passwrod){
        data = data.replace(new RegExp("{infoClass}","gi"), "")
        data = data.replace(new RegExp("{formClass}","gi"), "hide")
      }else{
        data = data.replace(new RegExp("{infoClass}","gi"), "hide")
        data = data.replace(new RegExp("{formClass}","gi"), "")
      }
      res.write(data)
      res.end()
    })
  },
    readImg: function (file, res){
    fs.readFile(file, "binary", function (err, data) { // binary 代表讀取一個二進制的文件 例如：圖片
        if(err) throw err; // nodejs 的異常處理， throw 可以把 error 拋出去
        res.writeHead(200, {"Content-Type" : "image/jpeg"})
        // 注意！！！在二進制流的前面是不可以再輸入其他內容/文本的，例如：res.write("test")，我們解決這個問題需要使用一個可以顯示圖文信息的方案！！！
        res.write(data, "binary")
        res.end()
    })
  }
}