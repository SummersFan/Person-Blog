/**
 * Created by 哈哈哈 on 2017/8/15.
 */
let mongoose = require('mongoose');

//写出用户集合映射
let userSchema = new mongoose.Schema({
    name: {type: String},
    sex: {type: String},
    age: {type: Number},
    account: {type: String},
    passWord: {type: String},
    email: {type: String}
}, {versionKey: false}); //设置版本锁位false

//写出文章集合映射
let articleSchema = new mongoose.Schema({
    topic: {type: String},
    author: {type: String},
    date: {type: String},
    content: {type: String},
    label: {type: Object},
    account_id: mongoose.Schema.Types.ObjectId
});

//写出标签集合映射
let labelSchema = new mongoose.Schema({
    label: Object
});


//设置集合名字，否则名字后就加s
userSchema.set('collection', 'user');
articleSchema.set('collection', 'article');
labelSchema.set('collection', 'label');

//链接数据库
let db = mongoose.connect('mongodb://localhost:27017/blog', {useMongoClient: true,});

//写对应的“集合”地模型
let userModel = db.model("user", userSchema);   //用户模型
let articleModel = db.model("article", articleSchema);   //文章模型
let labelModel = db.model("label", labelSchema);

//实体
let TestEntity = new userModel({
    name: "李佳伟",
    sex: "男",
    age: 21,
    account: "Lijiawei",
    passWord: "blog1416369417",
    email: "978649973@qq.com"
});

let date1 = new Date();
let date = date1.toDateString();


// //一次插入多条文档
// userModel.create(doc,function (err,candies) {
//     if(err){
//         console.log(err);
//     }
//     console.log(candies[0]);
//     console.log(candies[1]);
// });


//用户操作

//添加用户函数
let addUser = function (doc, callback) {
    userModel.create(doc, function (err, candies) {
        if (err) {
            console.log("err:" + err);
        } else {
            console.log("add success");
        }
        if (callback) {
            callback(err, candies);
        }
    });
};

//删除文档函数
let delUser = function (account, callback) {
    userModel.remove({account: account}, function (err, result) {
        if (err) {
            console.log("err:" + err);
        } else {
            console.log(result.result);
            if (callback) {
                if (result.result.n === 0) {
                    callback(true, result);
                } else {
                    callback(err, result);
                }
            }
        }
    })
};


//更新文档函数
let updateUser = function (docAccount, newData, callback) {
    userModel.update({account: docAccount}, {$set: newData}, [{update: true}, {safe: true}], function (err, raw) {
        if (err) {
            console.log(err);
        } else {
            if (raw.n === 0) {
                if (callback) {
                    callback(err, "no user", raw);
                }
            } else {
                if (callback) {
                    callback(err, 'The raw response from Mongo was ', raw);
                }
            }

        }
    });
};


//查询文档函数(查询一个)
let findOneUser = function (docName, callback) {
    userModel.findOne({name: docName}, function (err, doc) {
        if (err) {
            console.log("err:" + err);
        } else {
            console.log(doc);
        }
        if (callback) {
            callback(doc);
        }
    })
};


//根据名称查询符合条件地所有文档（模糊查询）
let findMoreUser = function (docName, callback) {
    userModel.find({name: {$regex: eval("/" + docName + "/i")}}, function (err, doc) {
        if (err) {
            console.log("err:" + err);
        } else {
            console.log("success");
        }
        if (callback) {
            callback(err, doc);
        }
    })
};

//根据账号查询用户
let findUserWithAccount = function (account, callback) {
    userModel.find({account: {$regex: eval("/" + account + "/i")}}, function (err, user) {
        if (err) {
            console.log("err:" + err);
            if (callback) {
                callback(true, "fail");
            }
            return -1;
        } else {
            if (callback) {
                if (user.length === 0) {
                    callback(true, "no this", user);
                    return -1;
                } else {
                    callback(false, "success", user);
                    return 0;
                }
            }
        }
    })
};


//查询所有用户
let findAllUsers = function (callback) {
    userModel.find(function (err, doc) {
        if (err) {
            console.log("err:" + err);
        } else {
            console.log("success");
        }
        if (callback) {
            callback(false, doc);
        }
    })
};


//文章操作

//添加文章函数
let addArticle = function (doc, callback) {
    articleModel.create(doc, function (err, candies) {
        if (err) {
            console.log("err:" + err);
        } else {
            console.log("add success");
        }
        if (callback) {
            callback(err, candies);
        }
    });
};

//查询该用户的所有文章
let findAllArticle = function (author, callback) {
    articleModel.find({author: {$regex: eval("/" + author + "/i")}}, function (err, doc) {
        if (err) {
            console.log("err:" + err);
            if (callback) {
                callback(true);
            }
            return -1;
        } else {
            if (callback) {
                callback(false, doc);
            }
        }
    })
};

//更新该用户的某一篇文章
let updateArticle = function (account_id, topic, newData, callback) {
    articleModel.update({
        account_id: account_id,
        topic: topic
    }, {$set: newData}, [{update: true}, {safe: true}], function (err, raw) {
        if (err) {
            console.log(err);
        } else {
            console.log(raw);
            if (raw.nModified === 0) {
                callback(true, "no this man", raw)
            } else {
                callback(false, "success", raw);
            }
        }
        if (callback) {
            callback();
        }
    });
};


//删除该用户的某一篇文章
let delArticle = function (account_id, topic, callback) {
    articleModel.remove({account_id: account_id, topic: topic}, function (err, res) {
        if (err) {
            console.log("err:" + err);
        } else {
            if (res.result.n !== 0) {
                console.log("success");
                if (callback) {
                    callback(false, res.result);
                }

            } else {
                console.log("no this article");
                if (callback) {
                    callback(true, res.result);
                }
            }
        }
    })
};


//通过文章名来查询文章
let findArticleByTopic = function (topic, callback) {
    articleModel.find({topic: {$regex: eval("/" + topic + "/i")}}, function (err, doc) {
        if (err) {
            console.log("err:" + err);
            if (callback) {
                callback(true);
            }
            return -1;
        } else {
            if (doc.length === 0) {
                if (callback) {
                    callback(true, null, "no doc");
                }
            } else {
                if (callback) {
                    callback(false, doc, "success");
                }
            }
        }
    });
};

//标签操作

//查询所有标签
let findLabel = function (callback) {
    labelModel.find({}, function (err, doc) {
        if (err) {
            console.log("err:" + err);
            if (callback) {
                callback(true, doc[0].label);
            }
            return -1;
        } else {
            if (callback) {
                callback(false, doc[0].label);
            }
        }
    })
};


//添加总标签
let addLabel = function (label, callback) {

    labelModel.find({}, function (err, doc) {
        let flag = 0;
        doc[0].label.map(function (value) {
            if (value === label) {
                flag = 1;
            }
        });
        if(flag === 1){
            callback(true, {});
        }else{
            labelModel.update({}, {$push: {label}}, [{update: true}, {safe: true}], function (err, raw) {   //数组操作
                if (err) {
                    if (callback) {
                        callback(true, raw);
                    }
                    return -1;
                } else {
                    console.log(raw);
                    if (raw.nModified === 0) {
                        callback(true, raw);
                    } else {
                        callback(false, raw);
                    }
                }
            });
        }
    });

};


//删除标签(在pull的条件里边需要添加数组名或者数据属性以区分)
let delLabel = function (label, callback) {
    labelModel.update({}, {$pull: {"label": label}}, [{update: true}, {safe: true}], function (err, raw) {   //数组操作
        if (err) {
            console.log("err:" + err);
            if (callback) {
                callback(true);
            }
            return -1;
        } else {
            console.log(raw);
            if (raw.nModified === 0) {
                callback(true, "no this tag");
            } else {
                callback(false, "success");
            }
        }
    });
};

//登陆
let login = function (account, password, callback) {
    userModel.findOne({account: account, passWord: password}, function (err, doc) {
        if (err) {
            if (callback) {
                callback(true, "err");
            }
        } else {
            if (doc === null) {
                if (callback) {
                    callback(true, "account/password is wrong");
                }
            } else {
                if (callback) {
                    callback(false, "login success", doc);
                }
            }
        }
    });
};


exports.addUser = addUser;
exports.delUser = delUser;
exports.updateUser = updateUser;
exports.findOneUser = findOneUser;
exports.findMoreUser = findMoreUser;
exports.findAllUsers = findAllUsers;
exports.findUserWithAccount = findUserWithAccount;

exports.addArticle = addArticle;
exports.delArticle = delArticle;
exports.updateArticle = updateArticle;
exports.findAllArticle = findAllArticle;
exports.findArticleByTopic = findArticleByTopic;

exports.addLabel = addLabel;
exports.findLabel = findLabel;
exports.delLabel = delLabel;

exports.login = login;