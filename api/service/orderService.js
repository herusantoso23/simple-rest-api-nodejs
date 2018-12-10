const Order = require('../models/orders');
const mongoose = require('mongoose');

exports.get_all_order = (req, res, next) => {
    Order.find()
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message : 'OK',
                result : result 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : 'ERROR',
                result : err
            });
        })
};

exports.create_order = (req, res, next) => {
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        product : req.body.productId 
    })

    //save data to mongo
    order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : 'OK',
                result : result 
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'ERROR',
                result: err
            })
        });
};

exports.get_order_by_id = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'OK',
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'ERROR',
                result: err
            })
        });
};

exports.update_order = (req, res, next) => {
    Order.findById(id)
        .exec()
        .then(result => {
            if(result){
                
            } else {
                res.status(404).json({
                    message: 'ERROR',
                    result: 'Not Found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'ERROR',
                result: err
            })
        });
};

exports.delete_order = (req, res, next) => {
    res.status(200).json({
        message : 'Delete order'
    });
};