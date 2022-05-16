const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    barcodeId: "String",
    Name: "String",
    ProductType: "String",
    Quantity: "String",
    MRP: "String",
    imageURL: "String"
},
    { timestamps: true }
);

const ProductInfo = mongoose.model("ProductInfo", schema);
module.exports = ProductInfo;