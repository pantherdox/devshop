const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "category name is required"],
        unique: true

    },
    description: {
        type: String,
    },

},
{timestamps: true}
)

module.exports = mongoose.model("Category", categorySchema)