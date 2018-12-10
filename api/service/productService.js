const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_product = (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
};

exports.create_product = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.body.productImage
    })

    //save data to mongo
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : 'Create product',
                createdProduct : result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productId;

    //get data product by id from mongo
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log("From databsae", doc);
            if(doc){
                res.status(200).json(doc);
            } else {
                res.status(404).json({message:"Product not found"});
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
        });
};

exports.update_product = (req, res, next) => {
    const id = req.body.productId;
    const product = new Product({
        name : req.body.name,
        price : req.body.price
    })

    Product.findByIdAndUpdate(id, { $set: {name: 'hasem'}}, {new: true})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'OK',
                result:result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'ERROR',
                result:err
            })
        })
};

exports.delete_product = (req, res, next) => {
    const id = req.body.productId;
    Product.remove({_id:id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err})
        })
};