//通过题目寻找文章

let mongo = require('../mongoos/mongoos.js');

let findArticleByTopic = function (topic,callback) {
    if(!topic){
        if(callback){
            callback(true,"no topic",null);
        }
    }else{
        mongo.findArticleByTopic(topic,function (err,doc,message) {
            if(err){
                if(callback){
                    callback(err,message,null);
                }
            }else{
                if(callback){
                    callback(err,message,doc);
                }
            }
        })
    }
};

module.exports = findArticleByTopic;