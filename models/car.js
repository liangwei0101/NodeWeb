/**
 * Created by 梁伟 on 2017/4/21.
 */
var db = require('./db')

function Car(car) {
    this.id = car.id;
    this.userid = car.userid
    this.numberPlate = car.numberPlate;
    this.principal = car.principal;
    this.tel = car.tel;
    this.location = car.location;
    this.status = car.status;
    this.brand = car.brand;
    this.time = car.time;
    this.remark = car.remark;

};
module.exports = Car;
//存储用户信息
Car.prototype.save = function(callback) {
//要存入数据库的用户文档
    var newCar = {
    id: this.id,
    userid: this.userid,
    numberPlate: this.numberPlate,
    principal: this.principal,
    tel: this.tel,
    location: this.location,
    status: this.status,
    brand: this.brand,
    time: this.time,
    remark: this.remark
    };
    var collection = db.get().collection('carInfo')
    collection.insertOne(newCar,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询带条件的用户信息
Car.prototype.getByUserid = function(userid, callback) {
    var collection = db.get().collection('carInfo')
    collection.find({userid:userid}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    });
};
//查询带条件的用户信息
Car.prototype.getById = function(id, callback) {
    var collection = db.get().collection('carInfo')
    collection.findOne({id:id},function(err, doc) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, doc);
        }
    });
};
//查询带条件的用户信息
Car.prototype.selectText = function(text, callback) {
    var collection = db.get().collection('carInfo')
    collection.find({principal:text}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            callback(null, docs);
        }
    });

};
//查询所有
Car.prototype.getAll = function (callback) {
    var collection = db.get().collection('carInfo')
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
Car.prototype.update = function (callback) {
    //要修改数据库的用户文档
    var newCar = {
        id: this.id,
        userid: this.userid,
        numberPlate: this.numberPlate,
        principal: this.principal,
        tel: this.tel,
        location: this.location,
        status: this.status,
        brand: this.brand,
        time: this.time,
        remark: this.remark
    };
    var collection = db.get().collection('carInfo')
    this.getById(this.id,function (err, docOld) {
        if (err) {
            console.log(err);
        }
        else{
            collection.updateOne(docOld,newCar,function(err, doc) {
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
// 删除单个数据
Car.prototype.remove = function(id, callback) {
    var collection = db.get().collection('carInfo')
    collection.deleteOne({id: id},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            console.log('我是删除后成功信息')
            callback(null, docs);
        }
    });
};