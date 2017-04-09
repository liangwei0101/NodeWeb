/**
 * Created by 梁伟 on 2017/3/7.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../models/user');
var crypto = require('crypto');
var aes256 = require('nodejs-aes256');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('我是get请求！')
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
        newUser.getOne(req.params.userid,function (err, user){
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
        }
        else{
            console.log(err);
            res.json('200');
        }
    });

});
module.exports = router;
