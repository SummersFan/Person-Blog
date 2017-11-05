//查询全部人员，按照id顺序
let mongos = require('../mongoos/mongoos.js');

let findAll = function (callback) {
    mongos.findAllUsers(function (err,result) {
        if(err){
            callback(true,"false",result);
            return -1;
        }else{
            callback(false,"success",result);
        }
    })
};

module.exports = findAll;