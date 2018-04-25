/**
 * Created by 梁伟 on 2017/3/24.
 */

var express = require('express');
var router = express.Router();
var Email = require('../../../models/email');
var nodemailer = require('nodemailer');
var userinfo = require('../../../models/user');

var MongoClient = require("../../../models/db").MongoClient;
var assert = require("../../../models/db").assert;
var url = require("../../../models/db").url;

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
    console.log('我是要发警报邮件！')
    var newUser = new userinfo({userid: req.params.userid});
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
            newUser = user[0];
            //console.log(newUser)
            newEmail.getAll(function (err, Email){
                if (err) {
                    console.log(err);
                }
                else{
                    if(Email.length === 0)
                    {
                        console.log('我是为空的情况')
                    }else {
                        newEmail=Email;
                        newEmail.alarmSubject=newEmail.alarmSubject.replace(/username/,newUser.name)
                        newEmail.alarmText=newEmail.alarmText.replace(/username/,newUser.name)
                        //-------------------------------------------------------------------------------------警报邮件邮件发送
                         var transporter = nodemailer.createTransport({
                         service: 'qq',
                         auth: {
                         user: newEmail.emailNumber , //从数据库取发送的邮件号
                         pass: newEmail.emailPasswd //授权码,通过QQ获取
                         }
                         });
                         var mailOptions = {
                         from: newEmail.emailNumber, // 发送者
                         to: newUser.email, // 接受者,可以同时发送多个,以逗号隔开
                         subject: newEmail.alarmSubject , // 标题
                         text: newEmail.alarmText , // plaintext body
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

  /*  MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        newUser.getOne(req.params.userid,db,function (err,doc) {
            if (err) {
                console.log(err);
            } else{
                newEmail.getAll(db,function (err, emailDoc){
                    if (err) {
                        console.log(err);
                    }
                    else{
                        if(emailDoc.length === 0)
                        {
                            console.log('我是为空的情况')
                        }else {
                            newEmail=emailDoc;
                            newEmail.alarmSubject=newEmail.alarmSubject.replace(/username/,doc.name)
                            newEmail.alarmText=newEmail.alarmText.replace(/username/,doc.name)
                            //-------------------------------------------------------------------------------------警报邮件邮件发送
                            var transporter = nodemailer.createTransport({
                                service: 'qq',
                                auth: {
                                    user: newEmail.emailNumber , //从数据库取发送的邮件号
                                    pass: newEmail.emailPasswd //授权码,通过QQ获取
                                }
                            });
                            var mailOptions = {
                                from: newEmail.emailNumber, // 发送者
                                to: '1449681915@qq.com', // 接受者,可以同时发送多个,以逗号隔开
                                subject: newEmail.alarmSubject , // 标题
                                text: newEmail.alarmText , // plaintext body
                                //html: '<b>网页内容 ✔</b>' // html body
                            };
                            transporter.sendMail(mailOptions, function(error, info){
                                if(error){
                                    console.log(error);
                                    res.json('500');
                                }else{
                                    console.log('发送邮件成功！' + info.response);
                                    res.json('200');
                                    db.close();
                                }
                            });
                            //-------------------------------------------------------------------------------------警报邮件发送

                        }

                    }
                });
            }
        })
    });*/

});

module.exports = router;




