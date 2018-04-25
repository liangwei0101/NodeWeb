/**
 * Created by 梁伟 on 2017/4/11.
 */
var express = require('express');
var router = express.Router();
var radioactive = require('../../../models/radioactive');


/* GET users listing. */
router.get('/get', function(req, res, next) {
    console.log('我是get请求！')
    var newRadioactive = new radioactive({});
    newRadioactive.getAll(function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(user)
            res.json(Info);
        }
    });
});
router.get('/get/:userid', function(req, res, next) {
    console.log('我是带参数的的get请求！')
    console.log(req.params.userid);
    var newRadioactive = new radioactive({
        userid: req.params.userid
    });
    newRadioactive.getByUserId(req.params.userid,function (err, Info){
     if (err) {
     console.log(err);
     }
     else{
     //console.log(Info)
     res.json(Info);
     }
   });
});
router.get('/select/:name', function(req, res, next) {
    console.log('我是查询的的get请求！')
    console.log(req.params.name)
    var reg = /^[0-9]+.?[0-9]*$/;
    var tempUserid = req.params.name;
    var tempName = req.params.name;
    if (reg.test(req.params.name)) {
        tempName='-1'
        console.log('我是编号')
    } else {
        tempUserid='-1'
        console.log('我是名字')
    }
    var newRadioactive = new radioactive({
        name: req.params.name
    });
    if(tempName === '-1'){
        newRadioactive.getByUserId(tempUserid,function (err, Info){
            if (err) {
                console.log(err);
            }
            else{
                res.json(Info);
            }
        });
    } else {
        newRadioactive.selectText(tempName,function (err, Info){
            if (err) {
                console.log(err);
            }
            else{
                //console.log(Info)
                res.json(Info);
            }
        });
    }
});
router.post('/save', function(req, res, next) {
    console.log('我是post请求！')
    console.log(req.body)
    var newRadioactive = new radioactive({
        id: req.body.id,
        name: req.body.name,
        userid: req.body.userid,
        principal: req.body.principal,
        place: req.body.place,
        RadiationType: req.body.RadiationType,
        status: req.body.status,
        radiationValue: req.body.radiationValue,
        time: req.body.time,
        alertValue: req.body.alertValue,
        remark: req.body.remark
    });
    newRadioactive.save(function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            res.json('200')
        }
    });

});
router.post('/update/:id', function(req, res, next) {
    console.log('我是修改的post请求！')
    console.log(req.body)
    var updateRadioactive = new radioactive({
        id: req.body.id,
        name: req.body.name,
        userid: req.body.userid,
        principal: req.body.principal,
        place: req.body.place,
        RadiationType: req.body.RadiationType,
        status: req.body.status,
        radiationValue: req.body.radiationValue,
        time: req.body.time,
        alertValue: req.body.alertValue,
        remark: req.body.remark
    });
    updateRadioactive.update(function (err, Info){
        if (err) {
            console.log(err);
        }
        else{
            //console.log(err);
            res.json('200');
        }
    });

});
router.post('/remove', function(req, res, next) {
    console.log('我是单个的删除请求！')
    console.log(req.body)
    var delRadioactive = new radioactive({
        id: req.body.id
    });
    delRadioactive.remove(req.body.id,function (err, user){
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
