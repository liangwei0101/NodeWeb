/**
 * Created by 梁伟 on 2017/4/27.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('测试测试测试');
    console.log(req.body);
    res.json('200')
});

module.exports = router;
