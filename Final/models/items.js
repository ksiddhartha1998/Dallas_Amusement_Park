const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
  "price": {
    "value": {
      "type": "Number"
    },
    "currency": {
      "type": "String"
    }
  },
  "image": {
    "type": "String"
  },
  "title": {
    "type": "String"
  },
  "description": {
    "type": "String"
  },
  "is_deleted": {
    "type": "Boolean"
  },
	"ridetype":{
		"type": "String"
	}
});


// Export the model
module.exports = mongoose.model('Items', ItemSchema);