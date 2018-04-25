var db = require('./db')

function User(user) {
    this.userid = user.userid;
    this.password = user.password;
    this.name = user.name;
    this.email = user.email;
    this.telephone = user.telephone;
    this.isAble = user.isAble;
    this.imgUrl = user.imgUrl;
    this.userType = user.userType;
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
        isAble: '0',
        imgUrl: 'default.jpg',
        userType: this.userType
    };
    var collection = db.get().collection('users')
    collection.insertOne(user,(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    }));
};
//查询带条件的用户信息
User.prototype.getByUserid = function(userid,callback) {
    var collection = db.get().collection('users')
    collection.find({userid:userid}).toArray(function(err, doc) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            callback(null, doc);
        }
    });
};
//查询管理员
User.prototype.getAdmin = function(callback) {
    var collection = db.get().collection('users')
    collection.find({userType:'1'}).toArray(function(err, doc) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            callback(null, doc);
        }
    });
};
//查询所有
User.prototype.getAll = function (callback) {
    var collection = db.get().collection('users')
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
User.prototype.update = function (callback) {
    //要修改数据库的用户文档
    console.log('我是更新信息')
    var updateUser = {
        userid: this.userid,
        password: this.password,
        name: this.name,
        email: this.email,
        telephone: this.telephone,
        isAble: this.isAble,
        userType: this.userType
    };
    var collection = db.get().collection('users')
    this.getByUserid(this.userid,function (err,userOld) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            updateUser.imgUrl = userOld[0].imgUrl
            collection.updateOne(userOld[0],updateUser,function(err, doc) {
                if (err) {
                    return callback(err);//失败！返回 err 信息
                } else {
                    callback(null, doc);
                }
            });
        }
    })

};
// 删除单个数据
User.prototype.remove = function(userid,callback) {

    var collection = db.get().collection('users')
    collection.deleteOne({userid: userid},function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            console.log('我是删除后成功信息')
            callback(null, docs);
        }
    });
};
//查询带条件的用户信息
User.prototype.selectText = function(text,callback) {
    var reg = /^[0-9]+.?[0-9]*$/;
    var tempUserid = text;
    var tempName = text;
    if (reg.test(text)) {
        tempName='-1'
        console.log('我是编号')
    } else {
        tempUserid='-1'
        console.log('我是名字')
    }
    var collection = db.get().collection('users')
    /*   collection.findOne({$or:[{userid:tempUserid},{name:tempName}] },(function(err, docs) {
     if (err) {
     return callback(null);//失败！返回 err 信息
     } else {
     //console.log(docs);
     callback(null, docs);
     }
     }));*/
    collection.find({$or:[{userid:tempUserid},{name:tempName}]}).toArray(function(err, docs) {
        if (err) {
            return callback(err);//失败！返回 err 信息
        } else {
            //console.log(user);
            callback(null, docs);
        }
    });

};
//更改密码
User.prototype.updatePasswd = function(text,callback) {
    var user = {userid: this.userid};

    var collection = db.get().collection('users')
    collection.updateOne({ userid : this.userid }
        , { $set: { password : text } }, function(err, result) {
            callback(null,result);
        });

};
//头像路径
User.prototype.updateImgUrl = function(url,callback) {
    var user = {userid: this.userid};

    var collection = db.get().collection('users')
    collection.updateOne({ userid : this.userid }
        , { $set: { imgUrl : url } }, function(err, result) {
            callback(null,result);
        });

};





