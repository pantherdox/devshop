const Category = require("../models/category.model")

const createCategory = async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(201).json({
        success: true, data: category
    })
}

const getCategories = async (req, res, next) => {
    const categories = await Category.find()
    res.status(200).json({
        success: true,
        data: categories,
        count: categories.length
    })
}

module.exports = {createCategory, getCategories}