
// Models
const Category = require('../models/category');

const { migrationProduct } = require('./product');


/**
 * Migration of category
 */
let migrationCategory = () => {
    Category.remove({}, (err) => {
        if (err) {
            console.log('Error deleting status');
        }

        seed(transactions());
    });
};


/**
 * Transactions of category and products
 * @return {JSON}
 */
let transactions = () => {
    return [
        {
            name: 'Sports Tennis',
            products: [
                {
                    provider: 'ADIDAS',
                    price: 179990,
                    rankin: 5,
                    description: 'Tennis running man lite racer reborn',
                    img: 't-1.jpeg'
                },
                {
                    provider: 'ADIDAS',
                    price: 160000,
                    rankin: 4,
                    description: 'Tennis running man falcon',
                    img: 't-2.jpeg'
                },
                {
                    provider: 'DIADORA',
                    price: 49990,
                    rankin: 3,
                    description: 'Tennis zap football',
                    img: 't-3.jpeg'
                },
                {
                    provider: 'NIKE',
                    price: 22990,
                    rankin: 5,
                    description: 'Tennis running man anthracite',
                    img: 't-3.jpeg'
                }
            ]
        },
        {
            name: 'Mountain Bicycles',
            products: [
                {
                    provider: 'JEEP',
                    price: 849990,
                    rankin: 5,
                    description: 'Mountain bike 27.5 vesubio 27.5 v18',
                    img: 'mb-1.jpeg'
                },
                {
                    provider: 'JEEP',
                    price: 849990,
                    rankin: 4,
                    description: 'Mountain bike 27.5 vesubio 27.5 v18',
                    img: 'mb-2.jpeg'
                },
                {
                    provider: 'DTFLY',
                    price: 749990,
                    rankin: 5,
                    description: 'Bicycle rin 28 hybrid',
                    img: 'mb-3.jpeg'
                }
            ]
        },
        {
            name: 'Tents',
            products: [
                {
                    provider: 'MOUNTAIN GEAR',
                    price: 849990,
                    rankin: 5,
                    description: 'Combo for 2 people',
                    img: 'tent-1.jpeg'
                },
                {
                    provider: 'NTK',
                    price: 849990,
                    rankin: 4,
                    description: 'Combo for 2 people',
                    img: 'tent-2.jpeg'
                },
            ]
        }
    ]
};


/**
 * Seed of category
 * @param {Object} transactions
 */
let seed = (transactions) => {

    for (let transaction of transactions) {

        let schema = new Category({ name: transaction.name });

        schema.save((err, categoryDB) => {

            if (err) {
                console.log('Error adding category', transaction);
            }

            migrationProduct(categoryDB._id, transaction.products)
        });
    }

    console.log('Added categories');
};


module.exports = {
    migrationCategory
};