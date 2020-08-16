var express = require('express');
var router = express.Router();
const Order = require('../models/order');
let category = ["", "Male","Female","Unisex", "Boy", "Girl"]
/* GET users listing. */
router.get('/', function(req, res, next) {
    Order.find({}, function(err, orders) {
        res.render('order_history', { user: req.user, category: category, orders: orders});
    })
  });
  
module.exports = router;