/**
 * Created by 梁伟 on 2017/3/22.
 */

var db = require('./db')


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
    var collection = db.get().collection('emailStyle')
    collection.insertOne(email,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询所有
Email.prototype.getAll = function (callback) {
    var collection = db.get().collection('emailStyle')
    collection.findOne({},(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//修改
Email.prototype.update = function (callback) {
    var updateEmail = {
        regSubject: this.regSubject,
        regText: this.regText,
        alarmSubject: this.alarmSubject,
        alarmText: this.alarmText,
        emailNumber: this.emailNumber,
        emailPasswd: this.emailPasswd
    };
    var collection = db.get().collection('emailStyle')
    this.getAll(function (err,docOld) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            collection.updateOne(docOld,updateEmail,function(err, docs) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    console.log('我是更新成功')
                    callback(null, docs);
                }
            });
        }
    })
};
//删除
Email.prototype.remove = function (callback) {
    var collection = db.get().collection('emailStyle')
    collection.deleteMany({},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            console.log('我是删除后成功信息')
            callback(null, docs);
        }
    });
};



