/**
 * Created by 梁伟 on 2017/4/14.
 */
var express = require('express');
var router = express.Router();
var transportTask = require('../../../models/transportTask');

/* GET users listing. */
router.get('/get', function(req, res, next) {
    console.log('我是get请求！')
    var newTransportTask = new transportTask({});
    newTransportTask.getAll(function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            res.json(Info);
        }
    });

});
router.get('/get/:userid', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.userid);
    var newTransportTask = new transportTask({});
    newTransportTask.getByUserId(req.params.userid,function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            res.json(Info);
        }
    });
});
router.get('/select/:text', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.text);
    var newTransportTask = new transportTask({});
    newTransportTask.selectText(req.params.text,function (err, user){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(user)
            res.json(user);
        }
    });
});
router.post('/save', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var newTransportTask = new transportTask({
        id: req.body.id,
        userid: req.body.userid,
        numberPlate: req.body.numberPlate,
        StartPlace: req.body.StartPlace,
        EndPlace: req.body.EndPlace,
        status: req.body.status,
        TaskName: req.body.TaskName,
        principal: req.body.principal,
        tel: req.body.tel,
        onTheWayPlace: req.body.onTheWayPlace,
        remark: req.body.remark,
        createDate: req.body.createDate,
        createTime: req.body.createTime,
        ShowStatusClass: req.body.ShowStatusClass
    });
    newTransportTask.save(function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            res.json('200')
        }
    });


});
router.post('/update/:id', function(req, res, next) {
    console.log('我是单个的修改请求！')
    console.log(req.body)
    var newTransportTask = new transportTask({
        id: req.body.id,
        userid: req.body.userid,
        numberPlate: req.body.numberPlate,
        StartPlace: req.body.StartPlace,
        EndPlace: req.body.EndPlace,
        status: req.body.status,
        TaskName: req.body.TaskName,
        principal: req.body.principal,
        tel: req.body.tel,
        onTheWayPlace: req.body.onTheWayPlace,
        remark: req.body.remark,
        createDate: req.body.createDate,
        createTime: req.body.createTime,
        ShowStatusClass: req.body.ShowStatusClass
    });
    newTransportTask.update(function (err, worktext){
        if (err) {
            console.log(err);
        }
        else{
            res.json('200');
        }
    });

});
router.post('/remove', function(req, res, next) {
    console.log('我是单个的删除请求1111！')
    console.log(req.body)
    var DeltransportTask = new transportTask({});
    DeltransportTask.remove(req.body.id,function (err, user){
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
