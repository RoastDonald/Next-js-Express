import UserRepository from "../../repository/UserRepo";
import config from "../../config/index";
import Oauth from "../../services/Oauth";
class UserController {
  constructor() {}
  loginWithGoogle = async (req, res, next) => {
    const userRepository = new UserRepository();
    const oauth = new Oauth();
    const { error: googleError, data: googleUser } = await oauth.withGoogle(
      req.body.token
    );
    if (googleError) {
      res.status(422).json({
        message: "Incorrect token",
      });
    }
    const { error, data: user } = await userRepository.getByProperties({
      email: googleUser.email,
    });
    if (error) {
      res.status(422).json({
        message: "Cannot get user",
      });
    }
    if (!user) {
      console.log("google register");
      const { error: saveError, data: user } = await userRepository.saveUser(
        googleUser
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
    } else {
      console.log("google login");
      req.session.userId = user._id;
      res.status(200).json({ data: user.getPublicFields() });
    }
  };

  updateUser = async (req, res, next) => {
    const userRepository = new UserRepository();
    const { error, data: user } = await userRepository.update(
      req.session.userId,
      req.body
    );
    const publicUser = user.getPublicFields();
    if (error) {
      res.status(422).json({
        message: "Cannot update user",
      });
    } else {
      res.status(200).json({ data: publicUser });
    }
  };

  getUserData = async (req, res, next) => {
    const userRepository = new UserRepository();
    const { error, data: user } = await userRepository.getById(
      req.session.userId
    );
    if (error) {
      res.status(422).json({
        message: "Cannot get user",
      });
    } else {
      res.status(200).json({ data: user.getPublicFields() });
    }
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

  logout = (req, res, next) => {
    new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(config.credentials.cookieName);
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
