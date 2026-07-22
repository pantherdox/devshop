const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const productRoutes = require("./routes/product.routes")
const authRoutes = require("./routes/auth.routes")
const paymentRoutes = require("./routes/payment.routes")
const categoryRoutes = require("./routes/category.routes")
const { notFound, errorHandler } = require("./middleware/error.middleware")
const path = require("path");

const app = express()

app.use(express.static(path.join(__dirname, "..", "public")))

app.use(cors())

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({
        message: "Devshop API is running 🚀"
    })
})

app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/categories", categoryRoutes)

app.use(notFound)
app.use(errorHandler)


module.exports = app