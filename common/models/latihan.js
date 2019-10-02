'use strict';

module.exports = function(Latihan) {
    Latihan.getLatihanByName = function(name, callback){
        new Promise(function(resolve, reject) {
            //fnd name
            Latihan.find({where :{nama : {like : name}}}, function(err, result){
                if (err) reject (err);
                if (result === null){
                    err = new Error("User Not Found");
                    err.statusCode =  404;
                    reject (err)
                }
                resolve(result);
            });
        }).then(function(res) {
            if (!res) callback (err);
            return callback(null, res[0]);
        }).catch(function (err) {
            callback (err);
        });
    };

    Latihan.remoteMethod(
        'getLatihanByName',
        {
            description : 'get user by name',
            accepts: [
                {arg : 'name', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/getLatihanByName', verb: 'get'},
        }
    );

};
