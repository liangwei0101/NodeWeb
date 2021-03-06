/**
 * Created by 梁伟 on 2017/4/1.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../../../models/user');
var workText = require('../../../models/workText');

/* GET users listing. */
router.get('/get', function(req, res, next) {
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
router.get('/get/:userid', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.userid);
    var WorkText = new workText({});
    WorkText.getByUserId(req.params.userid,function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(Info)
            res.json(Info);
        }
    });
});
router.get('/select/:text', function(req, res, next) {
    console.log('我是带参数的文章get请求！')
    console.log(req.params.text);
    var WorkText = new workText({});
    WorkText.getBytext(req.params.text,function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(Info)
            res.json(Info);
        }
    });
});
router.post('/save', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var userInfo = new userinfo({userid: req.body.userid})
    var WorkText = new workText({
        IsPublic: req.body.IsPublic,
        title: req.body.title,
        createDate: req.body.createDate,
        createTime: req.body.createTime,
        author: req.body.author,
        htmlForEditor: req.body.htmlForEditor,
        id: req.body.id,
        userid: req.body.userid,
        comment: []
    });
    userInfo.getByUserid(req.body.userid,function (err, user) {
        if (err) {
            console.log(err)
            console.log('111')
        } else {
            console.log(user[0].imgUrl)
            WorkText.imgUrl = 'http://localhost:3000/uploads/images/'+user[0].imgUrl
            WorkText.save(function (err, user){
                if (err) {
                    console.log(err);
                } else{
                    res.json('200')
                }
            });
        }
    })

});
router.post('/comment/save', function(req, res, next) {
    console.log('评论请求！')
    var temp = req.body
    var WorkText = new workText({id: req.body.id, comment: temp.comment})
    WorkText.commentSave(function (err,doc) {
        if (err) {
            console.log(err);
        }
        else{
            res.json('200')
        }
    })
});
router.post('/comment/remove', function(req, res, next) {
    console.log('删除评论请求！')
    console.log(req.body)
    var temp = req.body
    var WorkText = new workText({id: req.body.workId})
    WorkText.commentRemove(temp.clickCommentId ,function (err,doc) {
        if (err) {
            console.log(err);
        }
        else{
            res.json('200')
        }
    })
});
router.post('/update/:id', function(req, res, next) {
    console.log('我是单个的修改请求！')
    console.log(req.body)
    var WorkText = new workText({
        IsPublic: req.body.IsPublic,
        title: req.body.title,
        createDate: req.body.createDate,
        createTime: req.body.createTime,
        author: req.body.author,
        htmlForEditor: req.body.htmlForEditor,
        id: req.body.id,
        userid: req.body.userid
    });

    WorkText.update(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            res.json('200');
        }
    });

});
router.post('/remove', function(req, res, next) {
    var DelWorktext = new workText({});
    console.log(DelWorktext)
    DelWorktext.remove(req.body.id,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            res.json('200');
        }
    });

});
module.exports = router;
