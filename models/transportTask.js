/**
 * Created by 梁伟 on 2017/4/14.
 */
var db = require('./db')

function TransportTask(transportTask) {
    this.id = transportTask.id;
    this.userid = transportTask.userid
    this.numberPlate = transportTask.numberPlate;
    this.StartPlace = transportTask.StartPlace;
    this.EndPlace = transportTask.EndPlace;
    this.status = transportTask.status;
    this.TaskName = transportTask.TaskName;
    this.principal = transportTask.principal;
    this.tel = transportTask.tel;
    this.onTheWayPlace = transportTask.onTheWayPlace;
    this.remark = transportTask.remark;
    this.createDate =transportTask.createDate;
    this.createTime =transportTask.createTime;
    this.ShowStatusClass = transportTask.ShowStatusClass;
};
module.exports = TransportTask;
//存储用户信息
TransportTask.prototype.save = function(callback) {
//要存入数据库的用户文档
    var newTransportTask = {
        id: this.id,
        userid: this.userid,
        numberPlate: this.numberPlate,
        StartPlace: this.StartPlace,
        EndPlace: this.EndPlace,
        status: this.status,
        TaskName: this.TaskName,
        principal: this.principal,
        tel: this.tel,
        onTheWayPlace: this.onTheWayPlace,
        remark: this.remark,
        createDate: this.createDate,
        createTime: this.createTime,
        ShowStatusClass: this.ShowStatusClass
    };
    var collection = db.get().collection('transportTask')
    collection.insertOne(newTransportTask,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询带条件的用户信息
TransportTask.prototype.getByUserId = function(userid, callback) {
    var collection = db.get().collection('transportTask')
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
TransportTask.prototype.getById = function(id, callback) {
    var collection = db.get().collection('transportTask')
    collection.findOne({id: id},(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询所有
TransportTask.prototype.getAll = function (callback) {
    var collection = db.get().collection('transportTask')
    collection.find({}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(docs);
            callback(null, docs);
        }
    });
};
//修改
TransportTask.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var newTransportTask = {
        id: this.id,
        userid: this.userid,
        numberPlate: this.numberPlate,
        StartPlace: this.StartPlace,
        EndPlace: this.EndPlace,
        status: this.status,
        TaskName: this.TaskName,
        principal: this.principal,
        tel: this.tel,
        onTheWayPlace: this.onTheWayPlace,
        remark: this.remark,
        createDate: this.createDate,
        createTime: this.createTime,
        ShowStatusClass: this.ShowStatusClass
    };
    var collection = db.get().collection('transportTask')
    this.getById(this.id,function (err,doc) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            collection.updateOne(doc,newTransportTask,function(err, docs) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    console.log('我是更新成功信息')
                    callback(null, docs);
                }
            });
        }
    })
};
// 删除单个数据
TransportTask.prototype.remove = function(id, callback) {
    var collection = db.get().collection('transportTask')
    collection.deleteOne({id:id},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            console.log('我是删除后成功信息')
            callback(null, docs);
        }
    });
};