var mongoose = require('mongoose');

var Products = mongoose.model(
    'products',
    new mongoose.Schema({
        product_name: String,
        product_type: String,
        product_description: String,
        purchase_date: Date,
        product_price: String
    })
);

const createProduct = (data) => {
    return new Promise((success, fail) => {
        var product = new Products(data);
        product.save(err => {
            if(err){
                return fail(err);
            }
            return success();
        });
    });
}

// const getUserPasswordByEmail = (email) => {
//     return new Promise((success, fail) => {
//         User.find({email: email}, {password: 1, email: 1, first_name: 1, last_name: 1}, (err, data) => {
//             if(err){
//                 return fail(err);
//             }
//             return success(data[0]);
//         });
//     });
// }

module.exports = {
    createProduct,
    // getUserPasswordByEmail

}