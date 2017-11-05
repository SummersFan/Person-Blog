//添加文章

let mongo = require('../mongoos/mongoos.js');

let addArticle = function (doc,callback) {
    if(!doc){
        if(callback){
            callback(true,"no doc");
        }
        return -1;
    }else{
        mongo.addArticle(doc,function (err,result) {
            if(err){
                callback(true,"fail",result);
            }else{
                callback(false,"success",result);
            }
        })
    }
};

module.exports = addArticle;