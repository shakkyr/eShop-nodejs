const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/online-shop'

const productSchema = mongoose.Schema({
    name : String,
    price: Number,
    category: String,
    description: String,
    image: String
})

const Product = mongoose.model('product', productSchema)

exports.getAllProducts = () => {
  
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })



    // mongoose.connect(DB_URL).then(() => {
    //    return Product.find({})
    // }).then(products =>{
    //         mongoose.disconnect()
    // })

}

exports.getProductsByCategory = (category) => {
  
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(() => {
            return Product.find({category:category})
        }).then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}

exports.getProductById = (id) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL)
        .then(() => {
            return Product.findById(id)
        })
        .then(products=>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}