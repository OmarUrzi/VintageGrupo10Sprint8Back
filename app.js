const express = require('express')
const app = express()
const path = require('path');
const puerto = process.env.PORT
/*const logMiddleware = require('./src/middlewares/logMiddleware')*/
const methodOverride = require('method-override');
const session = require('express-session');
/*const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware')*/
const cookies = require('cookie-parser')

const homeRouter = require('./src/routes/homeRouter');
const productRouter = require('./src/routes/productRouter');
/*const carritoRouter = require('./src/routes/carritoRouter');
const userRouter = require('./src/routes/userRouter');*/


app.set('view engine', 'ejs')
app.use(express.json())
/*app.use(express.static(path.resolve(__dirname, '../public')))*/
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
/*app.use(logMiddleware);*/


app.use(session({
    secret: "shuuuuu",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies())
/*app.use(userLoggedMiddleware)*/

app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});

app.use('/', homeRouter);
app.use('/productos', productRouter);
/*app.use('/carrito', carritoRouter);
app.use('/users', userRouter);*/