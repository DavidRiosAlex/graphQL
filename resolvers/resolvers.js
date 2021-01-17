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
    },
    token(data){
      console.log(data);
      if (!(data && data.username && data.password)) throw {status: 404, error:'BAD REQUEST'};
      
      const user = UserModel.findOne({username: data.username });

      if (!user.authenticate(data.password)) throw {status:401, error:'NOT AUTHORIZED'};

      return {accessToken: user.getToken().token, refreshToken: user.getToken().refreshToken, user}
}};

export default Resolvers;
