import User from "../models/user";
import logger from "../loaders/logger";
import { Types } from "mongoose";

class UserRepo {
  constructor() {}

  getByProperties = async (props) => {
    try {
      const data = await User.findOne(props);
      return { error: null, data };
    } catch (error) {
      logger.error(error);
      return { error:'Server Error', data: null };
    }
  };

  getById = async (id) => {
    try {
      const data = await User.findOne(Types.ObjectId(id));
      return { error: null, data };
    } catch (error) {
      logger.error(error);
      return { error:'Server Error', data: null };
    }
  };

  saveUser = async (user) => {
    const { email, password, name, surname } = user;
    const hashedPassword = await User.generateHashedPassword(password);
    try {
      const user = new User({
        email,
        password: hashedPassword,
        name,
        surname,
      });
      const data = await user.save();
      return { error: null, data };
    } catch (error) {
      logger.error(error);
      return { error:'Server Error', data: null };
    }
  };
}
export default UserRepo;
