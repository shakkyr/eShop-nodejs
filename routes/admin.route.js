const router = require('express').Router()
const check = require('express-validator').check;
const multer = require('multer')

const adminController = require('../controllers/admin.controller')

router.get('/add', adminGuard, adminController.getAdd);

router.post('/add', adminGuard, multer({
    dest : 'images'
}).single('image'), adminController.postAdd);

module.exports = router;