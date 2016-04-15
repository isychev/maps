var express = require('express');
var router = express.Router();
var fs = require('fs');
var Jimp = require("jimp");
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/maps/:zoom/:x/:y', function (req, res, next) {
    console.log(req.params)
    var zoom = +req.params.zoom;
    var x = +req.params.x;
    var y = +req.params.y;
    var width = 1388;
    var height = 928;
    var cX = width / (zoom *2) * x;
    var cY = height / (zoom *2) * y;
    var cW = width / (zoom *2);
    var cH = height / (zoom *2);
    //console.log(x,y,cX,cY,cW,cH);
    
    var newFilePath = "public/images/img." + zoom + "." + x + "." + y + ".jpg"
    Jimp.read("public/images/img.jpg", function (err, images) {
        if (err)
            throw err;
        images
                .crop(cX, cY, cW, cH)
                .resize(256,256)
                .write(newFilePath, function () {
                    var img = fs.readFileSync(newFilePath);
                    res.writeHead(200, {'Content-Type': 'image/jpeg'});
                    res.end(img, 'binary');
                });
    });
});

module.exports = router;
