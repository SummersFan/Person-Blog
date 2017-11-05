//删除用户
let mongo = require('../mongoos/mongoos.js');

let delUser = function (account,callback) {
    if(!account){
        callback(true,"error",{});
        return -1;
    }else{
        mongo.delUser(account,function (err,result) {
            if(err){
                callback(true,"delete fail",result);
            }else{
                callback(false,"success",result);
            }
        })
    }
};

module.exports = delUser;