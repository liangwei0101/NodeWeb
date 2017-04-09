var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
    console.log('!!!!------------s');
   // console.log(req.session.user);
    res.sendfile('./public/index.html');
   /* if(req.session.user == undefined){
        console.log('我是测试中间session ！');
        res.sendfile('./public/index.html');
    }
    else {
        console.log('我现在是要进主页了');
        res.sendfile('./public/index.html');
    }*/
});

module.exports = router;
