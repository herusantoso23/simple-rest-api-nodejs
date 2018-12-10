const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/route/productRoute'); 
const orderRoutes = require('./api/route/orderRoute'); 
const userRoutes = require('./api/route/userRoute'); 
const fileRoutes = require('./api/route/fileRoute'); 

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routing
app.use('/files', fileRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//Handling error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

//Handling CORS Filter
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Origin",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTION'){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
})

//Connect to MongoDB
mongoose.connect(
    'mongodb://localhost:27017/news', 
    {useNewUrlParser:true}
);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

module.exports = app;