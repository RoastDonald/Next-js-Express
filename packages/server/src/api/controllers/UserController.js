import UserRepository from "../../repository/UserRepo";
import config from "../../config/index";

class UserController {
  constructor() {}

  getUserData = async (req, res, next) => {
    const userRepository = new UserRepository();
    const user = await userRepository.getById(req.session.userId);
    res.status(200).json({ data: user.getPublicFields() });
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const userRepository = new UserRepository();
    const { error, data: user } = await userRepository.getByProperties({
      email,
    });

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!user) {
      return res.status(401).json({ message: "Incorrect login or password" });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ message: "incorrect login or password" });
    } else {
      req.session.userId = user._id;
      req.session.role = user.role;
      res.status(200).json({ data: user.getPublicFields() });
    }
  };

  register = async (req, res, next) => {
    const { email } = req.body;
    const userRepository = new UserRepository();
    const {
      error: findError,
      data: _user,
    } = await userRepository.getByProperties({
      email,
    });
    if (findError) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (_user) {
      return res.status(400).json({ message: "This email already in use" });
    }

    const { error: saveError, data: user } = await userRepository.saveUser(
      req.body
    );

    if (saveError) {
      return res.status(500).json({ message: "Server Error" });
    } else {
      req.session.userId = user._id;
      req.session.role = user.role;
      res.status(201).json({
        data: user.getPublicFields(),
      });
    }
  };

  logout = async (req, res, next) => {
    new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(config.credentials.COOKIE_NAME);
        if (err) resolve(false);
        else resolve(true);
      })
    ).then((isDestroyed) => {
      if (!isDestroyed) {
        res.status(422).json({ message: "Try again" });
      } else {
        res.status(200).json({ message: "successfully logged out" });
      }
    });
  };
}

export default UserController;
