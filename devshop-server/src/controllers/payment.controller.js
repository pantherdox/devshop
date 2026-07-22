const crypto = require("crypto")
const Razorpay = require("razorpay")

// initialize the razorpay client with our keys
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//create order
const createOrder = async (req, res, next) => {
    try{
        const {amount} = req.body; //amount in Rupees from the client

        if(!amount || amount <= 0){
            return res.status(400).json({
                success: false,
                message: "Valid amount requires"
            })
        }

        const options = {
            amount: Math.round(amount * 100), // razorpay uses paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options)

        res.status(201).json({
            success: true,
            order, // contains the order_id
            keyId: process.env.RAZORPAY_KEY_ID // frontend needs public key
        })
    }catch(err){
        next(err)
    }
}

// verify payment
const verifyPayment = async (req, res, next) => {
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

        if(expectedSignature === razorpay_signature){
            return res.json({
                success: true,
                message: "Payment verified successfully"
            })
        }

        res.status(400).json({
            success: false,
            message: "Payment verification failed"
        })
    }catch(e){
        next(e)
    }
}

module.exports = {createOrder, verifyPayment}