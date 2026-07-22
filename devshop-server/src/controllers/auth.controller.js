const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const transporter = require("../config/email")

//Helper create a JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, name: user.email, role: user.role}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// generate OTP
function generateOTP(){
   return Math.floor(100000 + Math.random() * 900000).toString() 
}

const register = async (req, res, next) => {
    try{
        const {name, email, password, role} = req.body

        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({
                success: false, message: "Email already exists"
            })
        }

        const user = await User.create({name, email, password, role});

        res.status(201).json({
            success: true,
            token: generateToken(user),
            user: {
                id: user._id, name: user.name, email: user.email, role: user.role
            }
        })

    }catch(error){
        next(error)
    }
}

const login = async (req, res, next) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false, message: "Email & Password requried"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const isMatch = await user.matchPassword(password)

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        res.status(201).json({
            success: true,
            token: generateToken(user),
            user: {
                id: user._id, name: user.name, email: user.email, role: user.role
            }
        })

    }catch(error){
        next(error)
    }
}

const getMe = async (req, res, next) => {
    try{
        res.json({
            success: true, user: req.user
        })
    }catch(error){
        next(error)
    }
}

const forgetPassword = async (req, res, next)=>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const otp = generateOTP();

        user.otp = otp
        user.otpExpiry = Date.now() + 5 * 60 * 1000

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Forget Password OTP verification",
            html: `
                <h2>Password Reset OTP</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is vaild for 5 minutes only</p>
            `
        })

        res.json({
            success:true,
            message: "OTP sent successfully"
        })


    }catch(error){
        next(error)
    }
}

const verifyOtp = async (req, res, next) => {
    const {email, otp} = req.body;

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({
                success: false,
                message: "user not found"
            })
    }

    if(user.otp !== otp){
        return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
    }

    res.json({
        success: true,
        message: "OTP verified"
    })
}

module.exports = {register, login, getMe, forgetPassword, verifyOtp}