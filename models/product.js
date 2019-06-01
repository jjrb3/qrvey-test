const mongoose = require('mongoose');

let Schema = mongoose.Schema;

/**
 * Config schema product
 */
let collectionSchema = new Schema({
    provider: {
        type: String,
        required: [true, 'The provider is necessary']
    },
    price: {
        type: Number,
        required: [true, 'The price is necessary']
    },
    rankin: {
        type: Number,
        required: [true, 'The rankin is necessary']
    },
    description: {
        type: String,
        required: [true, 'The name is necessary']
    },
    img: {
        type: String,
        required: [true, 'The image is necessary']
    },
    category: {
        type: Schema.Types.ObjectId, ref: 'category'
    }
});


module.exports = mongoose.model('product', collectionSchema);