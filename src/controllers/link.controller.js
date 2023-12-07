import Link from "../models/links.model.js"
import { InternalServerError, NotFountError } from "../utils/errors.js"

export default {
  getAllLinks: async (req, res, next) => {
    try {
      const { title, categoryId } = req.query

      let query = {}

      if (title) {
        query.title = { $regex: title, $options: "i" }
      }

      if (categoryId) {
        query.category = categoryId
      }

      const linksQuery = Link.find(query)

      const links = categoryId
        ? await linksQuery
        : await linksQuery.populate("category")

      if (!links || links.length === 0) {
        return next(new NotFountError(404, "No links found."))
      }

      res.status(200).json({
        message: "success",
        data: links,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  createLink: async (req, res, next) => {
    try {
      const newLink = await Link.create({
        ...req.body,
        user: req.user_id,
      })
      await newLink.save()
      res.status(201).json({
        message: "success",
        data: newLink,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  getSingleLink: async (req, res, next) => {
    const linkId = req.params.id
    try {
      const link = await Link.findById(linkId)

      if (!link) {
        return next(new NotFountError(404, "Link not found."))
      }

      res.status(200).json({
        message: "success",
        data: link,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  updateLink: async (req, res, next) => {
    const linkId = req.params.id
    try {
      if (Object.keys(req.body).length === 0) {
        return next(new BadRequestError(400, "Request body cannot be empty."))
      }

      const updatedLink = await Link.findByIdAndUpdate(linkId, req.body, {
        new: true,
      })
      console.log(updatedLink)
      if (!updatedLink) {
        return next(new NotFountError(404, "Link not found."))
      }

      res.status(200).json({
        message: "success",
        data: updatedLink,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },

  deleteLink: async (req, res, next) => {
    const linkId = req.params.id
    try {
      const deletedLink = await Link.findByIdAndDelete(linkId)

      if (!deletedLink) {
        return next(new NotFountError(404, "Link not found."))
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
