import AdminRepo from '../../repository/AdminRepo';

class AdminController {
    constructor(){}

    getUsers = async (req,res)=>{
        const adminRepo =  new AdminRepo();
        const {data:users,error} = await adminRepo.getUsers();
        if (error) {
            res.status(422).json({
              message: "Cannot get users",
            });
          } else {
            res.status(200).json({ data: users });
          }
    }
    deleteUser = async (req,res)=>{
      const {email} = req.query;
      const adminRepo = new AdminRepo();
      const {data:message,error} = await adminRepo.deleteUser(email);
      if(error){
        res.status(422).json({
          message:"Cannot delete user",
        })
      } else {
        res.status(200).json({data:message});
      }
    }
}


export default AdminController;