let mongo = require('../mongoos/mongoos.js');

let findUserWithAccount = function (docAccount,callback) {

    if(!docAccount){
        callback(true,"no this user");
        return -1;
    }else{
        if(docAccount){
            mongo.findUserWithAccount(docAccount,function (err,result,message) {
                if(err){
                    if(callback){
                        callback(true,result,message);
                        return -1;
                    }
                }else{
                    if(callback){
                        callback(false,result,message);
                        return 0;
                    }
                }
            })
        }
    }
};


module.exports = findUserWithAccount;