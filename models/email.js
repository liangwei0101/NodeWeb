/**
 * Created by 梁伟 on 2017/3/22.
 */
var mongodb = require('./db');
function Email(email) {
    this.regSubject = email.regSubject;
    this.regText = email.regText;
    this.alarmSubject = email.alarmSubject;
    this.alarmText = email.alarmText;
    this.emailNumber = email.emailNumber;
    this.emailPasswd = email.emailPasswd;
};
module.exports = Email;
// 保存
Email.prototype.save = function(callback) {
//要存入数据库的用户文档
    var email = {
        regSubject: this.regSubject,
        regText: this.regText,
        alarmSubject: this.alarmSubject,
        alarmText: this.alarmText,
        emailNumber: this.emailNumber,
        emailPasswd: this.emailPasswd
    };
//打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
//读取 users 集合
        db.collection('emailStyle', function (err, collection) {
            if (err) {mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
//将用户数据插入 users 集合
            collection.insert(email, {
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
//查询所有
Email.prototype.getAll = function (callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return (err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('emailStyle', function (err, collection) {
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
//修改(因为数据只有一条，先删除后保存)
Email.prototype.update = function (callback) {
    var updateEmail = {
        regSubject: this.regSubject,
        regText: this.regText,
        alarmSubject: this.alarmSubject,
        alarmText: this.alarmText,
        emailNumber: this.emailNumber,
        emailPasswd: this.emailPasswd
    };
    this.getAll(function (err, email){
        if (err) {
            console.log(err);
        }
        else{
            //打开数据库
            mongodb.open(function (err, db) {
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
//读取 users 集合
                db.collection('emailStyle', function (err, collection) {
                    if (err) {mongodb.close();
                        return callback(err);//错误，返回 err 信息
                    }
//将用户数据插入 users 集合
                    collection.update(email[0],updateEmail, {
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
        }
    });
};
//删除
Email.prototype.remove = function (callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return (err);//错误，返回 err 信息
        }
        //读取 emailStyle 集合
        db.collection('emailStyle', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //删除所有
            collection.remove({ },function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                else {

                }
            });
        });
    });
};



