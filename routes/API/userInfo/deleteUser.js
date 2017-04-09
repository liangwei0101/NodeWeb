/**
 * Created by 梁伟 on 2017/3/22.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../../../models/user');

/* Post users listing. */
router.post('/', function(req, res, next) {
    console.log('我是单个的删除请求！')
    console.log(req.body)
    var delUser = new userinfo({
        userid: req.body
    });
    delUser.remove(req.body.userid,function (err, user){
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
