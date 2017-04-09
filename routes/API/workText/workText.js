/**
 * Created by 梁伟 on 2017/4/1.
 */
var express = require('express');
var router = express.Router();
var workText = require('../../../models/workText');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('我是get请求！')
    var WorkText = new workText({});
    WorkText.getAll(function (err, user){
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
    var WorkText = new workText({});
    WorkText.getOne(req.params.userid,function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            console.log(Info)
            res.json(Info);
        }
    });
});
router.post('/', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var WorkText = new workText({
        IsPublic: req.body.IsPublic,
        title: req.body.title,
        createDate: req.body.createDate,
        createTime: req.body.createTime,
        author: req.body.author,
        htmlForEditor: req.body.htmlForEditor,
        textID: req.body.textID,
        userid: req.body.userid
    });
    WorkText.save(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            WorkText.getAll(function (err, user){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log('返回！！！')
                    res.json(user);
                }
            });
        }
    });

});
router.post('/:textID', function(req, res, next) {
    console.log('我是单个的修改请求！')
    var WorkText = new workText({
        IsPublic: req.body.IsPublic,
        title: req.body.title,
        createDateTime: req.body.createDateTime,
        author: req.body.author,
        htmlForEditor: req.body.htmlForEditor,
        textID: req.body.textID
    });
    WorkText.update(function (err, worktext){
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
