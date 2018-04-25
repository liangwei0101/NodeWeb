/**
 * Created by 梁伟 on 2017/4/27. 用户上传文件
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var userinfo = require('../../../models/user');

router.post('/', function(req, res, next) {
    console.log('我是文件上传啊 啊啊！！！')
    console.log(req.body的)
    // ------------------修修改图片的名字
    var myDate = new Date()
    var test = req.cookies.userInfo.split("&");
    var Str = test[0]
    var StrTemp = Str.split('=')
    var useridUrl = StrTemp[1]

    var newUser = new userinfo({ userid: useridUrl, });

    var imgName = useridUrl + '_'
    imgName += myDate.getFullYear()
    imgName += myDate.getMonth() + 1
    imgName += myDate.getDate()
    imgName +='.jpg'   //写死，后面有机会再改吧
    // ------------------修改上传图片的名字

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../../../public/uploads/images');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        console.log(file.name)
        file.name = imgName
        console.log(file.name)
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
        newUser.updateImgUrl(imgName,function (err,doc) {
            if(err){
                console.log(err)
            }
        })
    });

    // parse the incoming request containing the form data
    form.parse(req);

    res.json(imgName)
});

module.exports = router;