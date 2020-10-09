const isAdmin = (req, res, next) => {
  if (req.session.role === 0) {
    return res.send("you are not allowed, get out now.");
  }
  next();
};
export default isAdmin;