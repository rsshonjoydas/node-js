export const processRequest = async (req, res, next) => {
  let correlation = req.headers['x-correlation-id'];
  if (!correlation) {
    correlation = Date.now().toString()
    req.headers['x-correlation-id'] = correlation
  }
  res.set('x-correlation-id', correlation)
  return next()
}