/**
 * Created by 梁伟 on 2017/3/22.
 */
var express = require('express');
var router = express.Router();
var userinfo = require('../../../models/user');

/* Post users listing. */
router.post('/', function(req, res, next) {
    console.log('我是单个的冻结/解冻请求！')
    console.log(req.body)
    if(req.body.isAble === '否'){
        var freezeUser = new userinfo({
            userid: req.body.userid,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.telephone,
            isAble: '是'
        });
    }
    else {
        var freezeUser = new userinfo({
            userid: req.body.userid,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.telephone,
            isAble: '否'
        });
    }
    freezeUser.update(function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            console.log('我是冻结/解冻成功的返回');
            res.json('200');
        }
    });
});
module.exports = router;
