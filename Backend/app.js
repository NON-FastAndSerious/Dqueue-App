const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();
const ProductInfo = require('./models/ProductInfo')
const app = express();
const port = process.env.PORT || 5000;

// MONGODB ATLAS INTEGRATION
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.uk9xj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Database Integration");
    })
    .catch((error) => {
        console.log(error);
    })


//Routes

/**
 * @swagger
 * /:
 *  get:
 *    description: Home route to check server status
 *    responses:
 *      200:
 *        description: Server up and running
 *      404:
 *        description: Server is down
 */
app.get("/", (req, res) => {
    res.json({ statusCode: 200, message: "Welcome to DQ" });
});

app.post('/create', async (req, res) => {
    const barcodeId = req.query.barcodeID;
    const Name = req.query.Name;
    const ProductType = req.query.productType;
    const Quantity = req.query.quantity;
    const MRP = req.query.mrp;
    const imageURL = req.query.imageURL;
    const newProduct = await ProductInfo.create({
        barcodeId,
        Name,
        ProductType,
        Quantity,
        MRP,
        imageURL
    })
    res.json({ statusCode: 200, data: newProduct });
})

/**
 * @swagger
 * /getProduct:
 *  post:
 *    description: API endpoint to get the details of the scanned product
 *    parameters:
 *      - name: barcodeID
 *        description: scanned barcode Id
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Product available
 *      404:
 *        description: Product Not available
 */
app.post("/getProduct", async (req, res) => {
    const barCodeID = req.query.barcodeID;
    try {
        const info = await ProductInfo.find({ barcodeId: barCodeID });
        res.json({ statusCode: 200, data: info });
    } catch (error) {
        res.json({ statusCode: 400, data: error });
    }
});

app.listen(port, () => {
    console.log("Welcome to Dequeue!!");
    console.log("=====================");
    console.log("-------------------------------");
    console.log(`| Server running at port ${port} |`);
    console.log("-------------------------------");
});



//The following code is for the documentation purposes and can be ABSOLUTELY SKIPPED

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Deque API",
            description: "A nodeJS based API for Deque App",
            contact: {
                name: "Fast and Serious",
            },
            servers: ["http://localhost:5000","https://dequeserver.herokuapp.com"]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


