//查询全部人员，按照id顺序
let mongos = require('../mongoos/mongoos.js');

let findAll = function (callback) {
    mongos.findAllUsers(function (err,data) {
        if(err){
            callback(true,"false");
            return -1;
        }else{
            callback(false,data);
        }
    })
};

module.exports = findAll;