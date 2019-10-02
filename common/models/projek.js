'use strict';

module.exports = function(Projek) {
    Projek.getProjekByName = function(name, callback){
        new Promise(function(resolve, reject) {
            //find name
            Projek.find({where :{nama : {like : name}}}, function(err, result){
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

    Projek.remoteMethod(
        'getProjekByName',
        {
            description : 'get user by name',
            accepts: [
                {arg : 'name', type : 'string'}
            ],
            returns : {
                arg : 'res', type: 'object', root: true
            },
            http:{path: '/getProjekByName', verb: 'get'},
        }
    );

};
