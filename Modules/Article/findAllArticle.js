//根据用户查询文章

let mongo = require('../mongoos/mongoos.js');

let findAllArticle = function (author,callback) {

    if(!author){
        if(callback){
            callback(true,"no account_id or topic");
        }
        return -1;
    }else{
        mongo.findAllArticle(author,function (err,doc) {
            if(callback){
                callback(false,"success",doc);
            }
        })
    }
};

module.exports = findAllArticle;