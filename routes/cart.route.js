const router = require("express").Router();
const bodyParser = require('body-parser');
const check = require("express-validator").check;

const authGaurd = require('./guards/auth.guard')

const cartController = require('../controllers/cart.controller');

router.post(
    "/",
    authGaurd.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("amount")
        .not()
        .isEmpty()
        .withMessage("amount is required")
        .isInt({ min: 1 })
        .withMessage("amount must be greater than 0"),
    cartController.postCart
);
module.exports = router;