/**
 * Created by 哈哈哈 on 2017/8/15.
 */
let mongoose = require('mongoose');

//写出映射
let userSchema = new mongoose.Schema({
    name : {type:String},
    sex : {type:String},
    age:{type:Number},
    account:{type:String},
    passWord:{type:String},
    email:{type:String}
},{ versionKey: false }); //设置版本锁位false




//设置集合名字，否则名字后就加s
userSchema.set('collection','user');

//链接数据库
let db = mongoose.connect('mongodb://localhost:27017/blog',{useMongoClient: true,});


//写对应的“集合”地模型
let userModel = db.model("user", userSchema);

//实体
let TestEntity = new userModel({
    name:"李佳伟",
    sex:"男",
    age:21,
    account:"Lijiawei",
    passWord:"blog1416369417",
    email:"978649973@qq.com"
});

// //一次插入多条文档
// userModel.create(doc,function (err,candies) {
//     if(err){
//         console.log(err);
//     }
//     console.log(candies[0]);
//     console.log(candies[1]);
// });



//添加文档函数
let addUser = function (doc,callback) {
    userModel.create(doc,function (err,candies) {
        if(err){
            console.log("err:"+err);
        }else {
            console.log("add success");
        }
        if(callback){
            callback();
        }
    });
};

//删除文档函数
let delUser = function (account,callback) {
    userModel.remove({account:account},function (err,res) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log("res:"+res);
            if(callback){
                callback();
            }
        }
    })
};



//更新文档函数
let updateUser = function (docName,newData,callback) {
    userModel.update({name:docName},{$set:newData},[{update:true},{safe:true}],function (err,raw) {
        if(err){
            console.log("err:"+err);
        }else {
            console.log('The raw response from Mongo was ', raw);
        }
        if(callback){
            callback();
        }
    });
};

//查询文档函数(查询一个)
let findOneUser = function (docName,callback) {
    userModel.findOne({name:docName},function (err,doc) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log(doc);
        }
        if(callback){
            callback(doc);
        }
    })
};


//根据名称查询符合条件地所有文档（模糊查询）
let findMoreUser = function (docName,callback) {
    userModel.find({name:{$regex:eval("/"+docName+"/i")}},function (err,doc) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log("success");
        }
        if(callback){
            callback(false,doc);
        }
    })
};

//根据账号查询用户
let findUserWithAccount = function (account,callback) {
    userModel.find({account:{$regex:eval("/"+account+"/i")}},function (err,user) {
        if(err){
            console.log("err:"+err);
            if(callback){
                callback(true,"fail");
            }
            return -1;
        }else{
            if(user.length === 0){
                callback(false,user,"no this");
                return -1;
            }else{
                callback(true,user,"success");
                return 0;
            }
        }
    })
};

//查询所有用户
let findAllUsers = function (callback) {
    userModel.find(function (err,doc) {
        if(err){
            console.log("err:"+err);
        }else{
            console.log("success");
        }
        if(callback){
            callback(false,doc);
        }
    })
};

exports.addUser = addUser;
exports.delUser = delUser;
exports.updateUser = updateUser;
exports.findOneUser = findOneUser;
exports.findMoreUser = findMoreUser;
exports.findAllUsers = findAllUsers;
exports.findUserWithAccount = findUserWithAccount;