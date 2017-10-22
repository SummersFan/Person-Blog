let express = require('express');
let bodyParser = require('body-parser');
let multer = require('multer');// v1.0.5
let app = express();

//使用中间件来进行解析Body的数据（根据请求的类型）
let upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


let port = process.env.PORT || 80;

let server = app.listen(port, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("访问地址为: http://" + host + port);

});

let addUser = require('./Modules/User/addUser.js');
let findMoreUser = require('./Modules/User/findUserWithName.js');
let findAll = require('./Modules/User/findAll.js');
let delUser = require('./Modules/User/delUser.js');
let updateUser = require('./Modules/User/updateUser.js');
let findUserWithAccount = require('./Modules/User/findUserWithAccount.js')

let addArticle = require('./Modules/Article/addArticle.js');
let delArticle = require('./Modules/Article/delArticle.js');
let findAllArticle = require('./Modules/Article/findAllArticle.js');
let updateArticle = require('./Modules/Article/updateArticle.js');


//配置访问的权限
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*"); //允许其它域名访问
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//通过人名查询
app.get('/findWithName/:name', function (req, res) {
    findMoreUser(req.params.name, function (err, result) {
        if (err) {
            res.jsonp({
                status: 404,
                contentType: "application/json; charset=utf-8",
                message: err,
            });
        } else {
            res.jsonp({
                status: 200,
                contentType: "application/json; charset=utf-8",
                message: err,
                data: result,
            });
        }
    })
});

//查找所有用户
app.get('/findAll', function (req, res) {
    findAll(function (err, data) {
        if (err) {
            res.jsonp({
                status: 404,
                contentType: "application/json; charset=utf-8",
                message: err,
            });
        } else {
            res.jsonp({
                status: 200,
                contentType: "application/json; charset=utf-8",
                message: err,
                data: data,
            });
        }
    })
});

//添加用户
app.post('/addUser', function (req, res) {
    let doc = req.body;
    console.log(req.body);
    addUser(doc, function (err, result) {
        if (err) {
            console.log("fail");
        }
    })
});

//通过账户删除用户
app.use('/delUser/:account', function (req, res) {
    console.log(req.params.account);
    if (req.params.account) {
        delUser(req.params.account, function (err, messages) {
            if (err) {
                res.jsonp({
                    status: 404,
                    contentType: "application/json; charset=utf-8",
                    message: err,
                });
            } else {
                res.jsonp({
                    status: 200,
                    contentType: "application/json; charset=utf-8",
                    message: err,
                });
            }
        })
    }
});

//更新用户
app.post('/updateUser', function (req, res) {
    let doc = req.body;
    let account = req.body.account;
    console.log(account);
    updateUser(account, doc, function (err, result) {
        if (err) {
            console.log("fail");
        }
    })
});

//文章api接口
app.post('/addArticle', function (req, res) {
    let doc = req.body;
    console.log(req.body);
    addArticle(doc, function (err, result) {
        if (err) {
            console.log("fail");
        }
    })
});

app.post('/updateArticle', function (req, res) {
    let doc = req.body;
    let account_id = req.body.account_id;
    let topic = req.body.topic;

    updateArticle(account_id, topic, doc, function (err, result) {
        if (err) {
            console.log("fail");
        }else{
            console.log("success");
        }
    })
});


app.use('/delArticle/', function (req, res) {
    findUserWithAccount(req.query.account,function (err,result,message) {
        console.log(result[0].id);
        console.log(err);
        if(err){
            console.log("fail");
        }else{
            delArticle(result[0].id,req.query.topic,function (err,message) {
                console.log(message);
            });
        }
    });
});


app.get('/findAllArticle/', function (req, res) {
    console.log(req.query.author);
    findAllArticle(req.query.author, function (err,message,result) {
        if (err) {
            res.jsonp({
                status: 404,
                contentType: "application/json; charset=utf-8",
                message: err,
            });
        } else {
            res.jsonp({
                status: 200,
                contentType: "application/json; charset=utf-8",
                message: err,
                data: result,
            });
        }
    })
});