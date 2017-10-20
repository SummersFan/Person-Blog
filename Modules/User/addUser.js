//注册用户
let mongo = require('../mongoos/mongoos.js');

let addUser = function (doc,callback) {
    if(!doc){
        callback(true,"there is no data");
        return 0;
    }else{
        if(doc){
            mongo.findUserWithAccount(doc.account,function (err,user,message) {
                console.log(message);
                if(message !== "no this"){
                    console.log("already have it");
                    return -1;
                }else{
                        if(doc){    //不存在，可以报名
                            //需要添加正则验证
                            console.log(1);
                            mongo.addUser(doc,function (err,result) {
                                if(err){
                                    callback(true,err);
                                }
                                if(callback){
                                    callback(false,"add success!");
                                    return 0;
                                }

                            })
                        }
                }
            });



        }
    }
};

module.exports = addUser;