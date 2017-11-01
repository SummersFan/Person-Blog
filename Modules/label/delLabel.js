//删除标签

let mongo = require('../mongoos/mongoos.js');

let delLabel = function (Label,callback) {

    if(!Label){
        if(callback){
            callback(true,"no Label");
        }
        return -1;
    }else{
        mongo.delLabel(Label,function (err,message) {
            if(callback){
                callback(false,"success");
            }
        })
    }
};

module.exports = delLabel;