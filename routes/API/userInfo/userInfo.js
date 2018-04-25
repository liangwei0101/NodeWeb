/**
 * Created by 梁伟 on 2017/4/24.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../../../models/user');
var crypto = require('crypto');
var aes256 = require('nodejs-aes256');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    console.log('我是用户管理的get请求！')
    var newUser = new userinfo({
        userid: "",
        password: ""
    });
    newUser.getAll(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(user)
            res.json(user);
        }
    });

});
router.get('/:userid', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.userid);
    var newUser = new userinfo({
        userid: req.params.userid,
        name: ""
    });
    newUser.getByUserid(req.params.userid,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(user)
            res.json(user);
        }
    });
});
router.post('/', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var key = 'salt_from_the_user_document';
    var tempPassword = aes256.encrypt(key, req.body.pass);
    console.log('-----------------------------')
    console.log(tempPassword)
    console.log('-----------------------------')
    var newUser = new userinfo({
        userid: req.body.userid,
        password: tempPassword,
        name: req.body.name,
        email: req.body.email,
        telephone:req.body.telephone,
        isAble:req.body.isAble
    });
    newUser.save(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            newUser.getAll(function (err, user){
                if (err) {
                    console.log(err);
                }
                else{
                    //console.log(user)
                    res.json(user);
                }
            });
        }
    });

});
router.post('/:userid', function(req, res, next) {
    console.log('我是单个的post请求！')
    var key = 'salt_from_the_user_document';
    var tempPassword = aes256.encrypt(key, req.body.pass);
    var updateUser = new userinfo({
        userid: req.body.userid,
        password: tempPassword,
        name: req.body.name,
        email: req.body.email,
        telephone:req.body.telephone,
        isAble:req.body.isAble
    });
    updateUser.update(function (err, user){
        if (err) {
            console.log(err);
        } else{
            res.json('200');
        }
    });

});*/

router.get('/user', function(req, res, next) {
    console.log('我是用户管理的get请求！')
    var newUser = new userinfo({});
    newUser.getAll(function (err, user){
        if (err) {
            console.log(err);
        } else{
            //console.log(user)
            res.json(user);
        }
    });

});
router.get('/user/:userid', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.userid);
    var newUser = new userinfo({
        userid: req.params.userid,
        name: ""
    });
    newUser.getByUserid(req.params.userid,function (err, user){
        if (err) {
            console.log(err);
        } else{
            //console.log(user)
            res.json(user);
        }
    });
});
router.get('/getAmin', function(req, res, next) {
    var newUser = new userinfo({});
    newUser.getAdmin(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(user)
            if(user !== [])
            res.json(user[0]);
        }
    });
});
router.get('/select/:text', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.text);
    var newUser = new userinfo({});
    newUser.selectText(req.params.text,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(user)
            res.json(user);
        }
    });
});
router.post('/save', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var key = 'salt_from_the_user_document';
    var tempPassword = aes256.encrypt(key, req.body.pass);
    var newUser = new userinfo({
        userid: req.body.userid,
        password: tempPassword,
        name: req.body.name,
        email: req.body.email,
        telephone:req.body.telephone,
        isAble:req.body.isAble,
        imgUrl:req.body.imgUrl,
        userType: req.body.userType
    });
    newUser.getByUserid(req.body.userid, function (err,doc) {
        if(err) {
            console.log(err)
        }else {
            if (doc === []){
                console.log(doc)
                res.json('304')
            }else {
                newUser.save(function (err, user){
                    if (err) {
                        console.log(err);
                    }
                    else{
                        res.json('200')
                    }
                });
            }
        }
    })

});
router.post('/update/:userid', function(req, res, next) {
    console.log('我是单个的修改请求！')
    console.log(req.body)
    var updateUser = new userinfo({
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email,
        telephone:req.body.telephone,
        isAble:req.body.isAble,
        imgUrl:req.body.imgUrl
    });
    updateUser.getByUserid(req.body.userid,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            updateUser.userType = user[0].userType
            updateUser.isAble = user[0].isAble
            updateUser.password = user[0].password
            updateUser.update(function (err, user){
                if (err) {
                    console.log(err);
                }
                else{
                    res.json('200')
                }
            })
        }
    });


});
router.post('/remove', function(req, res, next) {
    console.log('我是单个的删除请求！')
    console.log(req.body)
    var delUser = new userinfo({
        userid: req.body
    });
    delUser.remove(req.body.userid,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            console.log('我是成功删除的返回');
            res.json('200');
        }
    });
});
router.post('/freeze', function(req, res, next) {
    console.log('我是单个的冻结/解冻请求！')
    console.log(req.body)
    if(req.body.isAble === '0'){
        var freezeUser = new userinfo({
            userid: req.body.userid,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.telephone,
            isAble: '1',
            userType:req.body.userType
        });
    }
    else {
        var freezeUser = new userinfo({
            userid: req.body.userid,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.telephone,
            isAble: '0',
            userType:req.body.userType
        });
    }
    freezeUser.update(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            console.log('我是冻结/解冻成功的返回');
            res.json('200');
        }
    });

});
router.post('/passwd', function(req, res, next) {
    console.log('我是修改密码')
    var newUser = new userinfo({
        userid: req.body.userid
    });
    var key = 'salt_from_the_user_document';
    var tempPassword = aes256.encrypt(key, req.body.password);
    newUser.updatePasswd(tempPassword,function (err,doc) {
        if(err){
            console.log(err)
        } else {
            res.json('200')
        }
    })
});
module.exports = router;
