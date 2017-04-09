/*var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.createConnection('mongodb://localhost/liangwei');
// 链接错误
db.on('error', function(error) {
    console.log(error);
});
// Schema 结构
var Schema = mongoose.Schema;
var userlistScheMa = new Schema({
    userid     : {type : String},
    passwd : {type : String}
});

// 关联 firstblood -> admins 表
exports.user = db.model('users', userlistScheMa);*/

var mongodb = require('./db');
function User(user) {
    this.userid = user.userid;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.telephone = user.telephone;
    this.isAble = user.isAble;
};
module.exports = User;
//存储用户信息
User.prototype.save = function(callback) {
//要存入数据库的用户文档
    var user = {
        userid: this.userid,
        password: this.password,
        name: this.name,
        email: this.email,
        telephone: this.telephone,
        isAble: this.isAble
    };
//打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
//读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
//将用户数据插入 users 集合
            collection.insert(user, {
                safe: true
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, user);//成功！err 为 null，并返回存储后的用户文档
            });
        });
    });
};
//查询带条件的用户信息
User.prototype.getOne = function(userid, callback) {
    var reg = /^[0-9]+.?[0-9]*$/;
    var tempUserid = userid;
    var tempName = userid;
    if (reg.test(userid)) {
        tempName='-1'
        console.log('我是编号')
    } else {
        tempUserid='-1'
        console.log('我是名字')
    }
   //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
    //读取 users 集合
    db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }

    //查找用户名（name键）值为 name 一个文档
        collection.find({$or:[{userid:tempUserid},{name:tempName}] }).toArray(function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                else {
                    callback(null, user);//成功！返回查询的用户信息
                }
            });
        });
    });
};
//查询所有
User.prototype.getAll = function (callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return (err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.find({ }).toArray(function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                else {
                    //console.log(user);
                    callback(null, user);
                }
            });
        });
    });
};
//修改
User.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var updateUser = {
        userid: this.userid,
        password: this.password,
        name: this.name,
        email: this.email,
        telephone: this.telephone,
        isAble: this.isAble
    };
    this.getOne(this.userid,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            console.log('我是修改成功的标志')
            console.log(user[0])
            console.log('我是修改成功的标志')
            //打开数据库
            mongodb.open(function (err, db) {
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                //读取 users 集合
                db.collection('users', function (err, collection) {
                    if (err) {mongodb.close();
                        return callback(err);//错误，返回 err 信息
                    }
                    //user 是查询出来的对象，updateUser是要更新的对象
                    collection.update(user[0],updateUser , function (err, user) {
                        mongodb.close();
                        if (err) {
                            return callback(err);//错误，返回 err 信息
                        }
                        console.log('我是修改成功的标志')
                        console.log('我是修改成功的标志')
                        callback(null, user);//成功！err 为 null，并返回存储后的用户文档
                    });
                });
            });
        }
    });


};
// 删除单个数据
User.prototype.remove = function(userid, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //删除用户名（name键）值为 name 一个文档
            collection.remove({
                userid: userid
            }, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                console.log('我是删除后成功信息')
                callback(null, user);//成功！返回查询的用户信息
            });
        });
    });
};


