//删除用户
let mongo = require('../mongoos/mongoos.js');

let delUser = function (account,callback) {

    if(!account){
        callback(true,"error");
        return -1;
    }else{
        mongo.delUser(account,function () {
            console.log("success");
        })
    }
};

module.exports = delUser;