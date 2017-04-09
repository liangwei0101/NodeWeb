/**
 * Created by 梁伟 on 2017/4/1.
 */

var mongodb = require('./db');
function WorkText(worktext) {
    this.IsPublic = worktext.IsPublic;
    this.title = worktext.title;
    this.createDateTime = worktext.createDateTime;
    this.author = worktext.author;
    this.htmlForEditor = worktext.htmlForEditor;
    this.textID = worktext.textID;
    this.userid = worktext.userid
};
module.exports = WorkText;
//存储用户信息
WorkText.prototype.save = function(callback) {
//要存入数据库的用户文档
    var workText = {
        IsPublic: this.IsPublic,
        title: this.title,
        createDateTime: this.createDateTime,
        author: this.author,
        htmlForEditor: this.htmlForEditor,
        textID: this.textID,
        userid: this.userid
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
//读取 users 集合
        db.collection('workText', function (err, collection) {
            if (err) {mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
//将用户数据插入 users 集合
            collection.insert(workText, {
                safe: true
            }, function (err, workText) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                callback(null, workText);//成功！err 为 null，并返回存储后的用户文档
            });
        });
    });
};
//查询带条件的用户信息
WorkText.prototype.getOne = function(userid, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('workText', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }

            //查找用户名（name键）值为 name 一个文档
            collection.find({userid:userid}).toArray(function (err, workText) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                else {
                    callback(null, workText);//成功！返回查询的用户信息
                }
            });
        });
    });
};
//查询所有
WorkText.prototype.getAll = function (callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return (err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('workText', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（name键）值为 name 一个文档
            collection.find({ }).toArray(function (err, workText) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err 信息
                }
                else {
                    //console.log(user);
                    callback(null, workText);
                }
            });
        });
    });
};
//修改
WorkText.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var updateWorkText = {
        IsPublic: this.IsPublic,
        title: this.title,
        createDateTime: this.createDateTime,
        author: this.author,
        htmlForEditor: this.htmlForEditor,
        textID: this.textID
    };
    this.getOne(this.textID,function (err, workText){
        if (err) {
            console.log(err);
        }
        else{
            console.log('我是修改成功的标志')
            console.log(workText[0])
            console.log('我是修改成功的标志')
            //打开数据库
            mongodb.open(function (err, db) {
                if (err) {
                    return callback(err);//错误，返回 err 信息
                }
                //读取 users 集合
                db.collection('workText', function (err, collection) {
                    if (err) {mongodb.close();
                        return callback(err);//错误，返回 err 信息
                    }
                    //user 是查询出来的对象，updateUser是要更新的对象
                    collection.update(workText[0],updateWorkText , function (err, workText) {
                        mongodb.close();
                        if (err) {
                            return callback(err);//错误，返回 err 信息
                        }
                        console.log('我是修改成功的标志')
                        callback(null, workText);//成功！err 为 null，并返回存储后的用户文档
                    });
                });
            });
        }
    });


};
// 删除单个数据
WorkText.prototype.remove = function(textID, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('workText', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //删除用户名（name键）值为 name 一个文档
            collection.remove({
                textID: textID
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