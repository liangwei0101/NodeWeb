/**
 * Created by 梁伟 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../../../models/user');
var activity = require('../../../models/activity')
var aes256 = require('nodejs-aes256');

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('我是登入请求！')
    //console.log(req.headers)
    //console.log(req.body)
    var LoginUser = new userinfo({
        userid: req.body.userid,
        password: req.body.password
    });
    LoginUser.getByUserid(req.body.userid,function (err,doc) {
            if (err) {
                console.log(err);
            } else{
                if(doc[0]){   //如果有这个数据
                    var key = 'salt_from_the_user_document';
                    var passwd = aes256.decrypt(key, doc[0].password);
                    if (doc[0].isAble !== '1') {
                        if(passwd===req.body.pass){
                            console.log('200')
                            var result = {
                                status:'200',
                                userInfo: doc[0]   //成功登入
                            }
                            loginActivity(doc[0])
                            res.json(result)
                        }
                        else {

                            res.json('302')  // 密码账号不一致
                        }
                    }
                    else {
                        res.json('303') //  改号已被冻结
                    }
                } else {
                    console.log('301')
                    res.json('301')  // 没有该数据
                }
            }
        })
});

module.exports = router;

function loginActivity(userinfo) {
    var newActivity= new activity({
        userid: userinfo.userid,
        name: userinfo.name,
        loginNumber: 0,
        loginTime: null
    });
    newActivity.getByUserid(userinfo.userid,function (err, Info){
        if (Info === null) {
            newActivity.save(function (err,doc) {
                if (err) {
                    console.log(err)
                }
            })
        }
        else{
            newActivity.getAll(function (err,doc) {
                if (err){
                    console.log(err)
                }
                else {
                    newActivity.userid = Info.userid
                    newActivity.name = userinfo.name
                    newActivity.loginNumber = Info.loginNumber + 1
                    newActivity.loginTime = null
                    newActivity.update(function (err,doc) {
                        if(err){
                            console.log(err)
                        }
                    })
                }
            })
        }
    });
};