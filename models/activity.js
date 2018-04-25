/**
 * Created by 梁伟 on 2017/5/29.
 */
var db = require('./db')

function Activity(activity) {
    this.userid = activity.userid;
    this.name = activity.name;
    this.loginNumber = 0;
    this.loginPercentage = activity.loginPercentage ;
    this.loginTime = activity.loginTime;
};
module.exports = Activity;
//存储用户信息
Activity.prototype.save = function(callback) {
//要存入数据库的用户文档
    var newActivity= {
        userid: this.userid,
        name: this.name,
        loginNumber: 0,
        loginTime: this.loginTime
    };
    var timeTrans = new Date();
    newActivity.loginTime = (timeTrans.toLocaleString('chinese',{hour12:false}));
    var collection = db.get().collection('activity')
    collection.insertOne(newActivity,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询带条件的用户信息
Activity.prototype.getByUserid = function(userid, callback) {
    var collection = db.get().collection('activity')
    collection.findOne({userid:userid},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    });
};
//查询所有
Activity.prototype.getAll = function (callback) {
    var collection = db.get().collection('activity')
    collection.find({}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    });
};
//修改
Activity.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var newUpdate = {
        userid: this.userid,
        name: this.name,
        loginNumber: this.loginNumber,
        loginTime: this.loginTime
    };
    var collection = db.get().collection('activity')

    var timeTrans = new Date();
    newUpdate.loginTime = (timeTrans.toLocaleString('chinese',{hour12:false}));
    this.getByUserid(this.userid,function (err, docOld) {
        if (err) {
            console.log(err);
        }
        else{
            collection.updateOne(docOld,newUpdate,function(err, doc) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    console.log('我是更新成功信息')
                    callback(null, doc);
                }
            });
        }
    })
};