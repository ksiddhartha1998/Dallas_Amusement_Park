const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartSchema = new Schema({
    "user_id": {
      "type": mongoose.Schema.ObjectId
    },
    "item_id": {
      "type": mongoose.Schema.ObjectId
    },
    "is_deleted": {
      "type": "Boolean"
    },
    "quantity": {
      "type": "Number"
    }
  });


// Export the model
module.exports = mongoose.model('Cart', CartSchema);