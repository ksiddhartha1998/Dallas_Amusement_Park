const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
    "user_id": {
      "type": mongoose.Schema.ObjectId
    },
    "cart_list": {
      "type": [
        mongoose.Schema.ObjectId
      ]
    },
    "total_price": {
        "type": "Number"
    },
    "currency": {
        "type": "String"
    }
  });


// Export the model
module.exports = mongoose.model('Order', OrderSchema);