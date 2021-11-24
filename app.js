const express = require('express')
const path = require('path');

const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session)

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')

const app = express()


app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

const store = new SessionStore({
    uri : 'mongodb://localhost:27017/online-shop',
    collection : 'sessions'
})

app.use(session({
    secret : 'this is my secret secret to hash express sessions ...',
    saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.set('views', 'views')


app.use("/", homeRouter)
app.use('/', authRouter)
app.use("/product",productRouter)

app.listen(3000, ()=>{
    console.log('we are on port 3000');
})