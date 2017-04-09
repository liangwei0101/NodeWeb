/**
 * Created by 梁伟 on 2017/4/2.
 */
var express = require('express');
var router = express.Router();
var WorkText = require('../../../models/workText');

/* Post users listing. */
router.post('/', function(req, res, next) {
    console.log('我是单个的删除请求！')
    console.log(req.body)
    var DelWorktext = new WorkText({
        IsPublic: req.body.IsPublic,
        title: req.body.title,
        createDateTime: req.body.createDateTime,
        author: req.body.author,
        htmlForEditor: req.body.htmlForEditor,
        textID: req.body.textID
    });
    DelWorktext.remove(req.body.textID,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            console.log('我是成功删除的返回');
            res.json('200');
        }
    });
});
module.exports = router;

