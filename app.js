let express = require('express');
let multer = require('multer');// v1.0.5
let captchapng = require('captchapng');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();

//使用中间件来进行解析Body的数据（根据请求的类型）
let upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(cookieParser("fuck"));//设置cookie

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
let findArticleByTopic = require('./Modules/Article/findArticleByTopic.js');

let findLabel = require('./Modules/label/findLabel.js');
let addLabel = require('./Modules/label/addLabel.js');
let delLabel = require('./Modules/label/delLabel.js');

let login = require('./Modules/Login/login.js');


app.use(session({
    name: 'skey',
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    saveUninitialized: true, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话 可以同一个页面上获得不同请求的session
    cookie: {
        maxAge: 60 * 1000 // 有效期，单位是毫秒
    }
}));


//配置访问的权限
app.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin); //允许其它域名访问
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


let JSON = function (res,status,err,message,result) {
    res.jsonp({
        status: status,
        contentType: "application/json; charset=utf-8",
        err: err,
        message:message,
        result:result,
    })
};

//通过人名查询
app.get('/findWithName/', function (req, res) {
    findMoreUser(req.query.name, function (err,message, result) {
        if (err) {
            JSON(res,404,err,message,result);
        } else {
            JSON(res,200,err,message,result);
        }
    })
});

//查找所有用户
app.get('/findAll', function (req, res) {
    findAll(function (err,message,result) {
        if (err) {
            JSON(res,404,err,message,result);
        } else {
            JSON(res,200,err,message,result);
        }
    })
});

//添加用户
app.post('/addUser', function (req, res) {
    let doc = req.body;
    console.log(req.body);
    addUser(doc, function (err,message,result) {
        if (err) {
            JSON(res,404,err,message,result);
        }else{
            JSON(res,200,err,message,result);
        }
    })
});

//通过账户删除用户
app.use('/delUser/', function (req, res) {
    console.log(req.query.account);
    if (req.query.account) {
        delUser(req.query.account, function (err, message,result) {
            if (err) {
                JSON(res,404,err,message,result);
            } else {
                JSON(res,200,err,message,result);
            }
        })
    }
});

//更新用户
app.post('/updateUser', function (req, res) {
    let doc = req.body;
    let account = req.body.account;
    console.log(account);
    updateUser(account, doc, function (err,message,result) {
        if (err) {
            JSON(res,404,err,message,result);
        }else{
            JSON(res,200,err,message,result);

        }
    })
});

//文章api接口
app.post('/addArticle', function (req, res) {
    let doc = req.body;
    console.log(req.body);
    addArticle(doc, function (err,message,result) {
        if (err) {
            JSON(res,404,err,message,result);
        }else{
            JSON(res,200,err,message,result);
        }
    })
});

app.post('/updateArticle', function (req, res) {
    let doc = req.body;
    let account_id = req.body.account_id;
    let topic = req.body.topic;

    updateArticle(account_id, topic, doc, function (err,message,result) {
        if (err) {
            JSON(res,404,err,message,result);
        } else {
            JSON(res,200,err,message,result);
        }
    })
});


app.use('/delArticle/', function (req, res) {
    findUserWithAccount(req.query.account, function (err, message, result) {
        console.log(result[0].id);
        console.log(err);
        if (err) {
            JSON(res,404,err,message,result);
        } else {
            delArticle(result[0].id, req.query.topic, function (err, message) {
                JSON(res,200,err,message,result);
            });
        }
    });
});


app.get('/findAllArticle/', function (req, res) {
    findAllArticle(req.query.author, function (err, message, result) {
        if (err) {
            JSON(res,404,err,message,result);
        } else {
            JSON(res,200,err,message,result);
        }
    })
});

app.get('/findArticleByTopic/', function (req, res) {
    console.log(req.query.topic);
    findArticleByTopic(req.query.topic, function (err, message, result) {
        if (err) {
            JSON(res,404,err,message,result);

        } else {
            JSON(res,200,err,message,result);

        }
    })
});

//标签接口
app.get('/findLabel', function (req, res) {
    findLabel(function (err, message, arr) {
        if (err) {
            JSON(res,404,err,message,arr);
        } else {
            JSON(res,200,err,message,arr);
        }
    })
});

app.get('/addLabel', function (req, res) {
    let flag = 0;

    if (req.query.label) {
            addLabel(req.query.label, function (err,message,result) {

                    if (err) {
                        JSON(res,404,err,message,result);

                    }else{
                        JSON(res,200,err,message,result);
                    }
            })
    }
});

app.post('/delLabel', function (req, res) {
    if (req.query.label) {
        delLabel(req.query.label, function (err, message) {
            if (err) {
                JSON(res,404,err,message,{});
            }else{
                JSON(res,200,err,message,{});
            }
        })
    }
});


//获取验证码
app.get('/getVerCode', function (req, res) {

    let width = !isNaN(parseInt(req.query.width)) ? parseInt(req.query.width) : 100;
    let height = !isNaN(parseInt(req.query.height)) ? parseInt(req.query.height) : 30;

    let verCode = parseInt(Math.random() * 9000 + 1000);

    req.session.verCode = verCode;//会自动存入set-cookie中

    let p = new captchapng(width, height, verCode);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    let img = p.getBase64();
    let imgbase64 = new Buffer(img, 'base64');

    // res.end(imgbase64);


    // res.cookie('sessionID',req.session.id,{maxAge: 60 * 1000});//向cookie中存储session的id


    // res.send(req.cookies);

    // res.writeHead(200,{
    //     'Set-Cookie': ["aaa=bbb","ccc=ddd","eee=fff"],
    //     'Content-Type': 'text/plain'
    // });
    res.json({
        status: 200,
        contentType: {'Content-Type': 'image/png'},
        data: img,
    });

});

// app.get('/aww',function(req,res){
//     console.log(code);
// });


// app.get('/aaa', function (req, res) {
//     if (req.session.sign) {//检查用户是否已经登录
//         console.log(req.session);//打印session的值
//         res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
//     } else {//否则展示index页面
//         req.session.sign = true;
//         req.session.name = '汇智网';
//         res.end('欢迎登陆！');
//     }
// });

//登陆
app.post('/login', function (req, res) {
    let account = req.body.account;
    let password = req.body.password;
    let verCode = parseInt(req.body.verCode);
    let sessionVerCode = req.session.verCode;
    // console.log(req.session);

    // let cookie = req.headers.cookie;
    // console.log(req.session);

    if (verCode === sessionVerCode) {
        login(account, password, function (err, message, result) {
            if (err) {
                JSON(res,404,err,message,result);

            } else {
                JSON(res,200,err,message,result);

            }
        })
    } else {
        JSON(res,233,true,"验证码错误",{});

    }
});
