/**
 * Created by 梁伟 on 2017/4/1.
 */
var db = require('./db')

function WorkText(worktext) {
    this.IsPublic = worktext.IsPublic;
    this.title = worktext.title;
    this.createDate = worktext.createDate;
    this.createTime = worktext.createTime;
    this.author = worktext.author;
    this.htmlForEditor = worktext.htmlForEditor;
    this.id = worktext.id;
    this.userid = worktext.userid;
    this.imgUrl = worktext.imgUrl;
    this.comment = worktext.comment
};
module.exports = WorkText;
//存储用户信息
WorkText.prototype.save = function(callback) {
//要存入数据库的用户文档
    var workText = {
        IsPublic: this.IsPublic,
        title: this.title,
        createDate: this.createDate,
        createTime: this.createTime,
        author: this.author,
        htmlForEditor: this.htmlForEditor,
        id: this.id,
        userid: this.userid,
        imgUrl: this.imgUrl,
        comment: this.comment
    };

    var collection = db.get().collection('workText')
    collection.insertOne(workText,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            console.log(docs);
            callback(null, docs);
        }
    }));
};
//评论
WorkText.prototype.commentSave = function (callback) {
    //要修改数据库的用户文档
    var updateWorkText = {
        id: this.id,
        comment: this.comment
    };
    var collection = db.get().collection('workText')
    this.getById(this.id,function (err, workText){
        if (err) {
            console.log(err);
        }
        else{
            collection.updateOne({ id : updateWorkText.id },{ $push:{comment: updateWorkText.comment}},function(err, doc) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    callback(null, doc);
                }
            });
        }
    });

};
//评论删除
WorkText.prototype.commentRemove = function (commentId,callback) {
    //要修改数据库的用户文档
    var updateWorkText = {
        id: this.id
    };
    var collection = db.get().collection('workText')
    this.getById(this.id,function (err, workText){
        if (err) {
            console.log(err);
        }
        else{
            console.log(commentId)
            collection.updateOne({ id : updateWorkText.id },{ $pull:{comment: {commentId:commentId}}},function(err, doc) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    callback(null, doc);
                }
            });
        }
    });

};
//查询带条件的用户信息
WorkText.prototype.getByUserId = function(userid, callback) {
    var collection = db.get().collection('workText')
    collection.find({userid: userid}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(docs);
            callback(null, docs);
        }
    });
};
//查询带条件的用户信息
WorkText.prototype.getById = function(id, callback) {
    var collection = db.get().collection('workText')
    collection.findOne({id: id},function(err, doc) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(docs);
            callback(null, doc);
        }
    });
};
//查询带条件的用户信息
WorkText.prototype.getBytext = function(text, callback) {
    var collection = db.get().collection('workText')
    collection.find({author:text}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(docs);
            callback(null, docs);
        }
    });
};
//查询所有
WorkText.prototype.getAll = function (callback) {
    var collection = db.get().collection('workText')
    collection.find().toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(docs);
            callback(null, docs);
        }
    });
};
//修改
WorkText.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var updateWorkText = {
        IsPublic: this.IsPublic,
        title: this.title,
        createDate: this.createDate,
        createTime: this.createTime,
        author: this.author,
        htmlForEditor: this.htmlForEditor,
        id: this.id,
        userid: this.userid,
        imgUrl: this.imgUrl,
        comment: this.comment
    };
    var collection = db.get().collection('workText')
    this.getById(this.id,function (err, workText){
        if (err) {
            console.log(err);
        }
        else{
            updateWorkText.userid = workText.userid
            updateWorkText.createDate = workText.createDate
            updateWorkText.createTime = workText.createTime
            updateWorkText.imgUrl = workText.imgUrl
            updateWorkText.comment = workText.comment
            collection.updateOne(workText,updateWorkText,function(err, doc) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    console.log()
                    callback(null, doc);
                }
            });
        }
    });

};
// 删除单个数据
WorkText.prototype.remove = function(id, callback) {
    var collection = db.get().collection('workText')
    collection.deleteOne({id:id},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            callback(null, docs);
        }
    });
};