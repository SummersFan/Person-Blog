let express = require('express');
let bodyParser = require('body-parser');
let multer = require('multer');// v1.0.5
let app = express();

//使用中间件来进行解析Body的数据（根据请求的类型）
let upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended:true})); // for parsing application/x-www-form-urlencoded


let port = process.env.PORT || 80;

let server = app.listen(port,function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("访问地址为: http://"+host+port);

});

let addUser = require('./Modules/User/addUser.js');
let findMoreUser = require('./Modules/User/findUserWithName.js');
let findAll = require('./Modules/User/findAll.js');
let delUser = require('./Modules/User/delUser.js');

//配置访问的权限
app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*"); //允许其它域名访问
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//通过人名查询
app.get('/findWithName/:name',function (req,res) {
    findMoreUser(req.params.name,function (err,result) {
        if(err){
            res.jsonp({
                status:404,
                contentType: "application/json; charset=utf-8",
                message:err,
            });
        }else{
            res.jsonp({
                status:200,
                contentType: "application/json; charset=utf-8",
                message:err,
                data:result,
            });
        }
    })
});

//查找所有用户
app.get('/findAll',function (req,res) {
    findAll(function (err,data) {
        if(err){
            res.jsonp({
                status:404,
                contentType: "application/json; charset=utf-8",
                message:err,
            });
        }else{
            res.jsonp({
                status:200,
                contentType: "application/json; charset=utf-8",
                message:err,
                data:data,
            });
        }
    })
});

//添加用户
app.post('/addUser',function (req,res) {
    let doc = req.body;
    console.log(req.body);
    addUser(doc,function (err,result) {
        if(err){
            console.log("fail");
        }
    })
});

//通过账户删除用户
app.use('/delUser/:account',function(req,res){
    console.log(req.params.account);
    if(req.params.account){
        delUser(req.params.account,function (err,messages) {
            if(err){
                res.jsonp({
                    status:404,
                    contentType: "application/json; charset=utf-8",
                    message:err,
                });
            }else{
                res.jsonp({
                    status:200,
                    contentType: "application/json; charset=utf-8",
                    message:err,
                });
            }
        })
    }
});


