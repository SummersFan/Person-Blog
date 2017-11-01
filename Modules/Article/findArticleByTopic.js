//通过题目寻找文章

let mongo = require('../mongoos/mongoos.js');

let findArticleByTopic = function (topic,callback) {
    if(!topic){
        if(callback){
            callback(true,null,"no topic");
        }
    }else{
        mongo.findArticleByTopic(topic,function (err,doc,message) {
            if(err){
                if(callback){
                    callback(err,null,message);
                }
            }else{
                if(callback){
                    callback(err,doc,message);
                }
            }
        })
    }
};

module.exports = findArticleByTopic;