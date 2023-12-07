const ERRORS = (err, req, res, next) => {
  if (err.status == 500) {
    return res
      .status(400)
      .json({ status: 500, name: err.name, message: err.message })
  }
  res.status(400).json({ status: 400, name: err.name, message: err.message })
}

export default { ERRORS }
