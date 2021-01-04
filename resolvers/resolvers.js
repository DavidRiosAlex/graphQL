import UserModel from '../models/user';

let access;

const Resolvers = {

  user: ({token})=>{
    if (token !== access) throw new Error('Unauthorized');
    return ({
      get: async ()=>{
        const users = await UserModel.find({}).lean().exec();
        return users;
      },
      post: ()=>{
        return 'POST USER FUNCTION & USER LOGED';
      },
    });
  },
  task: ({token})=>{
    if (token !== access) throw new Error('Unauthorized');
    return ({
      get: ()=>{
        return 'GET TASK FUNCTION & USER LOGED WITH TOKEN: '+token;
      },
    });
  },
  access: ()=> {
    access = Date.now().toString();
    return access;
  },

};

export default Resolvers;
