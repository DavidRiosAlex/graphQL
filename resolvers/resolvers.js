import UserModel from '../models/user';

const Resolvers = {
  Query:{
    getUsers: async ()=>{
      const users = await UserModel.find({}).lean().exec();
      return users;
    }
  },
  Mutation:{
    postUser: async (_,{input},{req})=>{
      const user = await UserModel(input)
      await user.save()
      return user
    },
    access: async (_,{input},{req})=>{
      const user = await UserModel.findOne({username:input.username});
      if (! user.authenticate(input.password)) throw "401"
      const access = await user.getToken();
      return {user,...access}
    }
  }
};

export default Resolvers;
