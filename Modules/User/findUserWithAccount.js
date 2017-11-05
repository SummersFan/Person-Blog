let mongo = require('../mongoos/mongoos.js');

let findUserWithAccount = function (docAccount,callback) {

    if(!docAccount){
        callback(true,"no this user",{});
        return -1;
    }else{
        if(docAccount){
            mongo.findUserWithAccount(docAccount,function (err,message,result) {
                if(err){
                    if(callback){
                        callback(err,message,result);
                        return -1;
                    }
                }else{
                    if(callback){
                        callback(err,message,result);
                        return 0;
                    }
                }
            })
        }
    }
};

module.exports = findUserWithAccount;