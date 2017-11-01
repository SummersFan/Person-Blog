//查询所有标签

let mongo = require('../mongoos/mongoos.js');

let findLabel = function (callback) {
    mongo.findLabel(function (err, arr) {
        if (callback) {
            callback(false, arr, "success");
        }
    })
};

module.exports = findLabel();