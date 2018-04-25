/**
 * Created by 梁伟 on 2017/5/29.
 */

var express = require('express');
var async = require("async");
var router = express.Router();
var userinfo = require('../../../models/user');
var workText = require('../../../models/workText');
var radioactive = require('../../../models/radioactive');
var activity = require('../../../models/activity')

/* GET users listing. */
router.get('/get', function(req, res, next) {
    var Info = []
    console.log('我是欢迎请求！')
    var WorkText = new workText({});
    var User = new userinfo({});
    var Radioactive = new radioactive({});
    var Activity =  new activity({});

    var test = req.cookies.userInfo.split("&");
    var Str = test[0]
    var StrTemp = Str.split('=')
    var useridUrl = StrTemp[1]

/*    var newUser = new userinfo({ userid: useridUrl, });
    newUser.getByUserid(useridUrl,function (err,doc) {
        if (err){
            console.log(err)
        } else {
            loginActivity(doc[0])
        }
    })*/

// an example using an object instead of an array
    async.parallel({
        UserLength: function(callback) {
            User.getAll(function (err,info) {
                if(err){
                    console.log(err)
                }
                else {
                    callback(null,info.length);
                }
            });
        },
        RadioactiveLength: function(callback) {
            Radioactive.getAll(function (err,info) {
                if(err){
                    console.log(err)
                }
                else {
                    callback(null,info.length);
                }

            })
        },
        WorkTextLength: function(callback) {
            WorkText.getAll(function (err, info){
                if (err) {
                    console.log(err);
                }
                else{
                    callback(null,info.length);
                }
            });
        },
        ActivityInfo: function(callback) {
            Activity.getAll(function (err,info) {
                if(err){
                    console.log(err)
                }
                else {
                    callback(null,info);
                }

            })
        },
    }, function(err, results) {
 /*       a = max(results.ActivityInfo)*/
 /*       console.log(results.ActivityInfo)*/
     /*   console.log(a)*/
        res.json(results)
    });

});
module.exports = router;

/*function loginActivity(userinfo) {
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
};*/
