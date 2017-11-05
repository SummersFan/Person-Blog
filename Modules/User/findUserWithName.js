let mongo = require('../mongoos/mongoos.js');

let findMoreUser = function (docName,callback) {
    if(!docName){
        callback(true,"no this user",{});
        return -1;
    }else{
        if(docName){
            mongo.findMoreUser(docName,function (err,result) {
                if(err){
                    callback(true,"fail",err);
                    return -1;
                }else{
                    callback(false,"success",result);
                    return 0;
                }
            })
        }
    }
};



module.exports = findMoreUser;