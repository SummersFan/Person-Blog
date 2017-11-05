//更新用户
let mongo = require('../mongoos/mongoos.js');

let  updateUser = function (account,doc,callback) {
    if(!doc){
        callback(true,"there is no data",{});
        return -1;
    }else{
        mongo.findUserWithAccount(doc.account,function (err,message,result) {
            console.log(message);
            if(message === "no this"){
                console.log("don't have this user");
                if(callback){
                    callback(ture,"don't have this user",result);
                    return 0;
                }
                return -1;
            }else{
                if(doc){    //存在，可以修改
                    //需要添加正则验证
                    mongo.updateUser(account,doc,function (err,message,result) {
                        if(err){
                            callback(true,message,result);
                        }
                        if(callback){
                            callback(false,"update success!",result);
                            return 0;
                        }

                    })
                }
            }
        });
    }
};

module.exports = updateUser;