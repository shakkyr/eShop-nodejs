const router = require('express').router();
const bodyParser = require('body-parser');

const authGuard = require('./guards/auth.guard')

const cartController = require('../controllers/cart.controller');

router.post('/', authGuard.isAuth ,
        bodyParser.urlencoded({extended: true}),
        check('amount')
            .not()
            .isEmpty()
            .withMessage('amount is required')
            .isInt({min: 1})
            .withMessage('amount must be greater than 0')
        
)

module.exports = router;