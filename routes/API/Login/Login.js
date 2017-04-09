/**
 * Created by 梁伟 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../../../models/user');
var aes256 = require('nodejs-aes256');

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('我是登入请求！')
    console.log(req.headers)
    var LoginUser = new userinfo({
        userid: req.body.userid,
        password: req.body.pass
    });
    LoginUser.getOne(req.body.userid,function (err, user){
        if (err) {
            console.log(err);
        } else{
            console.log(user.length)
            if(user.length >=1){
                console.log(user[0])
                var key = 'salt_from_the_user_document';
                var passwd = aes256.decrypt(key, user[0].password);
                if(passwd===req.body.pass){
                    var result = {
                        status:'200',
                        userid: req.body.userid,
                        name: user[0].name,
                        email: user[0].email
                    }
                    res.json(result)
                }else {
                    res.json('302')
                }
            } else {
                res.json('301')
            }

        }
    });
});

module.exports = router;
