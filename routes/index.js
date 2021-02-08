var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/images')
    },
    filename : (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

    }
});

let upload = multer({storage : storage})

const indexController = require(path.join('..','controllers','indexController'))

/*require(path.join('..','controllers','indexController')); */

/* GET home page. */
router.get('/register', indexController.register);
router.post('/register', upload.any() ,indexController.registerProcess);
router.get('/login', indexController.login);
router.post('/login', indexController.loginProcess);

module.exports = router;
