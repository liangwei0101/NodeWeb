/**
 * Created by 梁伟 on 2017/4/10.
 */
var db = require('./db')

function Radioactive(radioactive) {
    this.id = radioactive.id;
    this.userid = radioactive.userid;
    this.name = radioactive.name;
    this.place = radioactive.place
    this.principal = radioactive.principal;    //负责人
    this.RadiationType = radioactive.RadiationType;
    this.status = radioactive.status;
    this.radiationValue = radioactive.radiationValue; //放射量
    this.time = radioactive.time; //更新时间
    this.alertValue = radioactive.alertValue; //警报值
    this.lng = radioactive.lng  //经度
    this.lat = radioactive.lat  //纬度
    this.remark = radioactive.remark; //备注
};
module.exports = Radioactive;
//存储用户信息
Radioactive.prototype.save = function(callback) {
//要存入数据库的用户文档
    var addRadioactive = {
        id: this.id,
        name: this.name,
        userid: this.userid,
        principal: this.principal,
        place: this.place,
        RadiationType: this.RadiationType,
        status: this.status,
        radiationValue: this.radiationValue,
        alertValue: this.alertValue,
        time: this.time,
        lng: this.lng,
        lat: this.lat,
        remark: this.remark
    };
    var collection = db.get().collection('radioactive')
    collection.insertOne(addRadioactive,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询带条件的用户信息
Radioactive.prototype.getByname = function(name, callback) {
    var collection = db.get().collection('radioactive')
    collection.find({$or:[{name:name},{principal:name}]}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    });
};
//查询单个用户信息
Radioactive.prototype.getById = function(id,callback) {
    var collection = db.get().collection('radioactive')
    collection.findOne({id: id},(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询单个用户信息
Radioactive.prototype.getByUserId = function(userid,callback) {
    var collection = db.get().collection('radioactive')
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
Radioactive.prototype.selectText = function(text, callback) {
    var collection = db.get().collection('radioactive')
    collection.find({$or:[{principal:text},{name:text}]}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            callback(null, docs);
        }
    });

};
//查询所有
Radioactive.prototype.getAll = function (callback) {
    var collection = db.get().collection('radioactive')
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
Radioactive.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var updateRadioactive = {
        id: this.id,
        name: this.name,
        userid: this.userid,
        principal: this.principal,
        place: this.place,
        RadiationType: this.RadiationType,
        status: this.status,
        radiationValue: this.radiationValue,
        alertValue: this.alertValue,
        time: this.time,
        lng: this.lng,
        lat: this.lat,
        remark: this.remark
    };
    var collection = db.get().collection('radioactive')
   this.getById(this.id,function (err,doc) {
       if (err) {
           return callback(err);//失败！返回 err 信息
       } else {
           updateRadioactive.lng = doc.lng;
           updateRadioactive.lat = doc.lat;
           collection.updateOne(doc,updateRadioactive,function(err, docs) {
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
Radioactive.prototype.remove = function(id,callback) {
    var collection = db.get().collection('radioactive')
    collection.deleteOne({id:id},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            console.log('我是删除后成功信息')
            callback(null, docs);
        }
    });
};