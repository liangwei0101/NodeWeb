var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
    console.log('------------------------');
   // console.log(req.session.user);
    res.sendfile('./public/index.html');
});

module.exports = router;
