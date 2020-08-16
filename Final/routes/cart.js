var express = require('express');
var router = express.Router();
const Cart = require('../models/cart');
const Item = require('../models/items');
const Order = require('../models/order');
const mongoose = require('mongoose');
let category = ["", "Water","land","Kids", "Thrill"]
/* GET users listing. */
router.get('/', function(req, res, next) {
    Cart.aggregate([{
        $match: {
            user_id: mongoose.Types.ObjectId(req.user._id),
            is_deleted: false,
            quantity: { $gt: 0 }
        },
      }, {
        $lookup: {
            from: "items", // collection name in db
            localField: "item_id",
            foreignField: "_id",
            as: "itemObj"
        }
    },{$unwind: '$itemObj'}]).exec(function(err, cart) {
        let totalSum = 0;
        cart.forEach(function(cartItem){
            totalSum += cartItem.quantity * cartItem.itemObj.price.value;
          });
        res.render('manage_cart', { user: req.user, category: category, cart: cart, totalSum: totalSum.toFixed(2)});
    });
  });
  
router.post('/', function(req, res) {
    Item.findOne({_id: req.body._id}, function(err,obj) { 
        Cart.findOneAndUpdate({user_id: req.user._id, item_id:req.body._id, is_deleted:false},
            {$set: {user_id: req.user._id, item_id:req.body._id, is_deleted: false},
           $inc : {quantity:req.body.quantity}}, {upsert: true, new: true }, function(err, data){ 
            if(err) return console.log(err);
            res.render('details', { user: req.user, item: obj, category: category, cart: data});
        });
     })
});

router.post('/update', function(req, res) {
    Item.findOne({_id: req.body._id}, function(err,obj) { 
        Cart.findOneAndUpdate({user_id: req.user._id, item_id:req.body._id, is_deleted:false},
            {$set: {user_id: req.user._id, item_id:req.body._id, is_deleted: false},
           $inc : {quantity:req.body.quantity}}, {upsert: true, new: true }, function(err, data){ 
            if(err) return console.log(err);
        });
     });
	Cart.aggregate([{
        $match: {
            user_id: mongoose.Types.ObjectId(req.user._id),
            is_deleted: false,
            quantity: { $gt: 0 }
        },
      }, {
        $lookup: {
            from: "items", // collection name in db
            localField: "item_id",
            foreignField: "_id",
            as: "itemObj"
        }
    },{$unwind: '$itemObj'}]).exec(function(err, cart) {
        let totalSum = 0;
        cart.forEach(function(cartItem){
            totalSum += cartItem.quantity * cartItem.itemObj.price.value;
          });
        res.render('manage_cart', { user: req.user, category: category, cart: cart, totalSum: totalSum.toFixed(2)});
    });
});

router.post('/checkout', function(req, res) {
    Cart.find({
        user_id: mongoose.Types.ObjectId(req.user._id),
        is_deleted: false,
        quantity: { $gt: 0 }
    }, function(err, data){
        let cartArray = [];
        data.forEach(function(cartItem){
			console.log(cartItem.item_id);
			// Item.find({_id: cartItem.item_id}, function (err, item) {
			// 	console.log(item[0].title);
			// 	cartArray.push(item[0].title);
			// });
            cartArray.push(cartItem.item_id);
        })
        let order = new Order(
            {
                user_id: req.user._id,
                cart_list: cartArray,
                total_price: req.body.total_price,
                currency: "usd"
            }
        );
        order.save(function (err) {
              if (err) {
                  console.log('Could not create')
              }
              Cart.update({user_id: req.user._id}, {"$set":{"is_deleted": true}}, {"multi": true}, (err, writeResult) => {
                res.render('checkout_complete', { user: req.user, category: category});
            });
          })
        });
    })
module.exports = router;