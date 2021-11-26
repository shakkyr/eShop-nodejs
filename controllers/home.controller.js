const productsModel = require('../models/products.model')

exports.getHome = (req,res,next)=> {
    let category = req.query.category;
    let validCategories = ['gaming','backpacks', 'kitchen','women','kids']
    let productsPromise;
    if( category && validCategories.includes(category) ) productsPromise =  productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getAllProducts()
    productsPromise.then( products =>{
        res.render('index', {
            products:products,
            isUser : req.session.userId,
            validationError:  req.flash('validationErrors')[0]
        })
        })

}
