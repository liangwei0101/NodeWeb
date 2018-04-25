/**
 * Created by 梁伟 on 2017/4/21.
 */
var express = require('express');
var router = express.Router();
var car = require('../../../models/car');

/* GET users listing. */
router.get('/get', function(req, res, next) {
    console.log('我是车辆的所有')
    var newCar = new car({});
    newCar.getAll(function (err, Info){
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
    var newCar = new car({});
    newCar.getByUserid(req.params.userid,function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            res.json(Info);
        }
    });
});
router.get('/select/:text', function(req, res, next) {
    console.log('我是带参数的get请求！')
    console.log(req.params.text);
    var reg = /^[0-9]+.?[0-9]*$/;
    var tempUserid = req.params.text;
    var tempName = req.params.text;
    if (reg.test(req.params.text)) {
        tempName='-1'
        console.log('我是编号')
    } else {
        tempUserid='-1'
        console.log('我是名字')
    }
    var newCar = new car({});
    if(tempName === '-1'){
        newCar.getByUserid(tempUserid,function (err, Info){
            if (err) {
                console.log(err);
            }
            else{
                console.log(Info)
                res.json(Info);
            }
        });
    } else {
        newCar.selectText(tempName,function (err, Info){
            if (err) {
                console.log(err);
            }
            else{
                res.json(Info);
            }
        });
    }
});
router.post('/save', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var newCar = new car({
        id: req.body.id,
        userid: req.body.userid,
        numberPlate: req.body.numberPlate,
        principal: req.body.principal,
        tel: req.body.tel,
        location: req.body.location,
        status: req.body.status,
        time: req.body.time,
        brand: req.body.brand,
        remark: req.body.remark,
    });
    newCar.save(function (err, Info){
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
    var newCar = new car({
        id: req.body.id,
        userid: req.body.userid,
        numberPlate: req.body.numberPlate,
        principal: req.body.principal,
        tel: req.body.tel,
        location: req.body.location,
        status: req.body.status,
        time: req.body.time,
        brand: req.body.brand,
        remark: req.body.remark,
    });
    newCar.update(function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            res.json('200');
        }
    });

});
router.post('/remove', function(req, res, next) {
    console.log('我是单个的删除请求！')
    console.log(req.body)
    var Delcar = new car({
        id: req.body.id
    });
    Delcar.remove(req.body.id,function (err, user){
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