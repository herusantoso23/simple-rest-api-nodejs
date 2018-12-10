const User = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.sign_up = (req, res, next) => {
    User.find({email:req.body.email})
        .exec()
        .then(userFound => {
            console.log(userFound);
            if(userFound.length >= 1){
                return res.status(422).json({
                    message: 'Email already exist'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            email : req.body.email,
                            password : hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json(result);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                })
            }
        })
};

exports.login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(userFound => {
            if(userFound.length < 1){
                return res.status(401).json({
                    message : 'Unregistered Account'
                });
            }

            bcrypt.compare(req.body.password, userFound[0].password, (err, result) => {
                if(result){
                    const token = jwt.sign(
                        {
                            "email":userFound[0].email
                        }, process.env.JWT_KEY, 
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: "Auth Success",
                        token : token
                      });
                } else {
                    return res.status(401).json({
                        message : 'Password doesnt match'
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.delete_user = (req, res, next) => {
    const id = req.body.userId;
    User.remove({_id:id})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({message: 'User deleted'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err})
        })
};