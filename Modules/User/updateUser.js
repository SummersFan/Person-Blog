//更新用户
let mongo = require('../mongoos/mongoos.js');

let  updateUser = function (account,doc,callback) {
    if(!doc){
        callback(true,"there is no data");
        return -1;
    }else{
        mongo.findUserWithAccount(doc.account,function (err,user,message) {
            console.log(message);
            if(message === "no this"){
                console.log("don't have this user");
                if(callback){
                    callback(false,"don't have this user");
                    return 0;
                }
                return -1;
            }else{
                if(doc){    //存在，可以修改
                    //需要添加正则验证
                    console.log(1);
                    mongo.updateUser(account,doc,function (err,result) {
                        if(err){
                            callback(true,err);
                        }
                        if(callback){
                            callback(false,"update success!");
                            return 0;
                        }

                    })
                }
            }
        });
    }
};

module.exports = updateUser;