//删除文章

let mongo = require('../mongoos/mongoos.js');

let delArticle = function (account_id,topic,callback) {

    if(!account_id||!topic){
        if(callback){
            callback(true,"no account_id or topic");
        }
        return -1;
    }else{
        mongo.delArticle(account_id,topic,function (err,message) {
            if(callback){
                callback(false,"success");
            }
        })
    }
};

module.exports = delArticle;

