const Product = require("../models/product.model")

// Create a product POST
const createProduct = async (req, res, next) => {
    try{
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true, data: product
        })
    } catch(error){
        next(error);
    }
}

// Get all products GET
const getProducts = async (req, res, next) => {
    try{
        const {category, minPrice, maxPrice, search, sort, page=1, limit=5} = req.query

        //filters
        const filter = {}
        if(category) filter.category = category
        if(search) filter.name = {$regex: search, $options:"i"}
        if(minPrice || maxPrice){
            filter.price = {}
            if(minPrice) filter.price.$gte = Number(minPrice)
            if(maxPrice) filter.price.$lte = Number(maxPrice)
        }

        //sorting
        const sortOptions = sort ? sort.replace("-","") : "createdAt";
        const sortDirection = sort && sort.startsWith("-") ? -1 : 1

        //pagination
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (page - 1) * limitNum;

        const [products, total] = await Promise.all([ Product.find(filter).populate("category").sort({[sortOptions] : sortDirection}).skip(skip).limit(limitNum),
        Product.countDocuments(filter), ]);

        res.status(200).json({
            success: true,
            count: products.length,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
            data: products
        })

        
    }catch(error){
        next(error)
    }
}

// Get a single product (GET)
const getProductById = async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                success: false, message: "product not found"
            })
        }
        res.json({
            success: true, data: product
        })
    }catch(error){
        next(error)
    }
}

// Update a product PUT
const updateProduct = async (req, res, next) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!product){
            return res.status(404).json({
                success: false, message: "product not found"
            })
        }

        res.json({
            success: true, data: product
        })

    } catch(error){
        next(error)
    }
}

// Delete the product (DELETE)
const deleteProduct = async (req, res, next) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({
                success: false, message: "product not found"
            })
        }
        res.json({
            success: true, message: "Product deleted successfully"
        })
    }catch (error){
        next(error)
    }
}

// upload Image
const uploadProductImage = async (req, res, next) => {
    try{
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "Please upload an image file"
            })
        }

        const imageUrl = `/uploads/${req.file.filename}` // public URL path

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {image : imageUrl},
            {new: true}
        )

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        res.json({
            success: true,
            data: product, imageUrl
        })
    }catch(error){
        next(error)
    }
}

module.exports = {createProduct, getProducts, getProductById, updateProduct, deleteProduct, uploadProductImage}