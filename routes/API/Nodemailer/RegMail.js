/**
 * Created by 梁伟 on 2017/3/24.
 */

var express = require('express');
var router = express.Router();
var Email = require('../../../models/email');
var nodemailer = require('nodemailer');
var userinfo = require('../../../models/user');


/* GET users listing. */
router.get('/:userid', function(req, res, next) {
    var newUser = new userinfo({
        userid: req.params.userid,
        password: '',
        name: '',
        email: '',
        telephone: '',
        isAble:''
    });
    var newEmail = new Email({
        regSubject: "",
        regText: "",
        alarmSubject: "",
        alarmText:"",
        emailNumber: "",
        emailPasswd: ""
    });
    newUser.getByUserid(req.params.userid,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            newUser = user;
            newEmail.getAll(function (err, Email){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(newUser)
                    if(Email.length === 0)
                    {
                        console.log('我是为空的情况')
                    }else {
                        newEmail=Email;
                        newEmail.regSubject=newEmail.regSubject.replace(/username/,newUser[0].name)
                        newEmail.regText=newEmail.regText.replace(/username/,newUser[0].name)
                        //-------------------------------------------------------------------------------------注册邮件邮件发送
                        var transporter = nodemailer.createTransport({
                            service: 'qq',
                            auth: {
                                user: newEmail.emailNumber , //从数据库取发送的邮件号
                                pass: newEmail.emailPasswd //授权码,通过QQ获取
                            }
                        });
                        var mailOptions = {
                            from: newEmail.emailNumber, // 发送者
                            to: newUser[0].email, // 接受者,可以同时发送多个,以逗号隔开
                            subject: newEmail.regSubject , // 标题
                            text: newEmail.regText , // plaintext body
                            //html: '<b>网页内容 ✔</b>' // html body
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                console.log(error);
                                res.json('500');
                            }else{
                                console.log('发送邮件成功！' + info.response);
                                res.json('200');
                            }
                        });
                        //-------------------------------------------------------------------------------------警报邮件发送

                    }

                }
            });
        }
    });
});

module.exports = router;




