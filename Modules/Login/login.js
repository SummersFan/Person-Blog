//登陆接口

let mongo = require('../mongoos/mongoos.js');

let login = function (account,password,callback) {
    mongo.login(account,password,function (err,message,doc) {
        if(err){
            callback(err,message);
        }else{
            callback(err,message,doc);
        }
    })
};

module.exports = login;