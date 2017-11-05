//添加标签
let mongo = require('../mongoos/mongoos.js');

let addLabel = function (Label,callback) {
    if(!Label){
        if(callback){
            callback(true,"no Label");
        }
        return -1;
    }else{
        mongo.addLabel(Label,function (err,result) {
            if(err){
                callback(err,"fail",result);
            }else{
                callback(err,"success",result);
            }
        })
    }
};

module.exports = addLabel;