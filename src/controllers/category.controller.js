import Category from "../models/category.model.js"
import { InternalServerError, NotFountError } from "../utils/errors.js"

export default {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.find()
      res.status(200).json({
        message: "success",
        data: categories,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  createCategory: async (req, res, next) => {
    try {
      const newCategory = await Category.create(req.body)
      await newCategory.save()
      res.status(201).json({
        message: "success",
        data: newCategory,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  getSingleCategory: async (req, res, next) => {
    const categoryId = req.params.id
    try {
      const category = await Category.findById(categoryId)

      if (!category) {
        return next(new NotFountError(404, "Category not found."))
      }

      res.status(200).json({
        message: "success",
        data: category,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  updateCategory: async (req, res, next) => {
    const categoryId = req.params.id
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        req.body,
        { new: true }
      )

      if (!updatedCategory) {
        return next(new NotFountError(404, "Category not found."))
      }

      res.status(200).json({
        message: "success",
        data: updatedCategory,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  deleteCategory: async (req, res, next) => {
    const categoryId = req.params.id
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId)

      if (!deletedCategory) {
        return next(new NotFountError(404, "Category not found."))
      }

      res.status(204).json({
        message: "success",
        data: null,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },
}
