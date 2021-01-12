import UserModel from '../models/user';

let access;

const Resolvers = {
  Query:{
    getUsers: async ()=>{
      const users = await UserModel.find({}).lean().exec();
      return users;
    }
  },
  Mutation:{
    postUser: async (_,{input},{req})=>{
      console.table(req)
      const user = await UserModel(input)
      await user.save()
      return user
    }
  }
};

export default Resolvers;
