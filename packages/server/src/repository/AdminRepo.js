

import User from '../models/user';
import logger from '../loaders/logger';

class AdminRepo {
    constructor(){}

    getUsers = async ()=> {
        try {
            const users = await User.find({});
            return {
                error: null,
                data: users
              };
        }catch(error){
            logger.error(error);
            return {
                error,
                data: null
              };
        }
    }


    deleteUser = async (email) =>{
        try {
            const isDeleted = await User.deleteOne({email});
            if(isDeleted){
                return {
                    error:null,
                    data:`User ${email} was deleted`
                }
            }
        }catch(error){
            logger.error(error);
            return {
                error,
                data:null
            }
        }
    }
}

export default AdminRepo;