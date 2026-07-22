const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
        },
        price:{
            type: Number,
            required: [true, "Price is required"]
        },
        description: {
            type: String,
            default: "this is a product description"
        },
        inStock: {
            type: Boolean,
            default: true
        },
        image: {
            type: String, // URL/path uploads/picture.png
            default: "",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "category is required"]
        }
    },
    { timestamps: true}
)

module.exports = mongoose.model("Product", productSchema)