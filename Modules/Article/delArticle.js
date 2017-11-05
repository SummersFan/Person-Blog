//删除文章

let mongo = require('../mongoos/mongoos.js');

let delArticle = function (account_id,topic,callback) {

    if(!account_id||!topic){
        if(callback){
            callback(true,"no account_id or topic",[]);
        }
        return -1;
    }else{
        mongo.delArticle(account_id,topic,function (err,result) {
            if(err){
                callback(err,"fail",result);
            }else{
                callback(err,"success",result);
            }
        })
    }
};

module.exports = delArticle;

