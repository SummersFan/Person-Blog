//更新文章

let mongo = require('../mongoos/mongoos.js');

let updateArticle = function (account_id,topic,doc,callback) {

    if(!account_id||!topic){
        if(callback){
            callback(true,"no account_id or topic");
        }
        return -1;
    }else{
        mongo.updateArticle(account_id,topic,doc,function (err,message) {

            if(err){
                callback(true,message);
            }else{
                callback(false,message);
            }
        })
    }
};

module.exports = updateArticle;