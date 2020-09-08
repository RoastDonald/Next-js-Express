import { Router } from "express";

const route = Router();

export default (app) => {
  app.use("/users", route);

  route.get("/login", auth, (req, res) => {
    res.status(200).json({
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      cart: req.user.cart,
      history: req.user.history,
    });
  });

  route.post("/register", (req, res) => {
    const user = new User(req.body);

    route.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
      });
    });
  });

  route.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.json({
          loginSuccess: false,
          message: "Auth failed, email not found",
        });

      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "Wrong password" });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("w_auth", user.token).status(200).json({
            loginSuccess: true,
          });
        });
      });
    });
  });

  route.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    });
  });
};
