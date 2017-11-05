//查询所有标签

let mongo = require('../mongoos/mongoos.js');

let findLabel = function (callback) {
    mongo.findLabel(function (err, arr) {
        if(err){
            callback(false, "fail", arr);
        }else{
            callback(false, "success", arr);
        }
    })
};

module.exports = findLabel;