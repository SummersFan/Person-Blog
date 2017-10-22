//添加文章

let mongo = require('../mongoos/mongoos.js');

let addArticle = function (doc,callback) {

    if(!doc){
        if(callback){
            callback(true,"no doc");
        }
        return -1;
    }else{
        mongo.addArticle(doc,function (err,message) {
            console.log("success");
            if(callback){
                callback(false,"success");
            }
        })
    }
};

module.exports = addArticle;