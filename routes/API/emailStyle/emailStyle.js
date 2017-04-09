/**
 * Created by 梁伟 on 2017/3/7.
 */
var express = require('express');
var router = express.Router();
var Email = require('../../../models/email');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('我是邮件get请求！')
    var newEmail = new Email({
        regSubject: "username:您好！您已成为注册超网的用户！",
        regText: "欢迎成为超网的用户！我们将通过此电子邮件地址与您联系。此致 liangwei",
        alarmSubject: "报警啦！报警啦！报警啦！",
        alarmText:"username:您好,您在超网设置的警报值已超过，请火速查看！"
    });
    newEmail.getAll(function (err, Email){
        if (err) {
            console.log(err);
        }
        else{
            if(Email.length === 0)
            {
                console.log('我是为空的情况')
                res.json(newEmail)
            }else {
                console.log(Email)
                res.json(Email[0]);
            }

        }
    });
});
router.post('/', function(req, res, next) {
    console.log('我是post修改请求！')
    var updateEmail = new Email({
        regSubject: req.body.regSubject,
        regText: req.body.regText,
        alarmSubject: req.body.alarmSubject,
        alarmText: req.body.alarmText,
        emailNumber: req.body.emailNumber,
        emailPasswd: req.body.emailPasswd,
    });
     updateEmail.update(function (err, updateEmail) {
                    if (err) {
                        console.log(err);
                    }else {

                        res.json(updateEmail)
                    }
                });
});
module.exports = router;
