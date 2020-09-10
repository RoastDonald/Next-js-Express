const isAuthenticated = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    res.status(403).json({
      message: "You are not authenticated",
    });
  } else {
    next();
  }
};

export default isAuthenticated;
