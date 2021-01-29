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
    async access(_,{login:{username,password}}, {req:{headers}}){

        if (!(username && password)) throw {status: 400, error:'BAD REQUEST'};
        
        const user = await UserModel.findOne({username: username });

        if (!user) throw {status:404, error: 'NOT FOUND'}; 

        if (!user.authenticate(password)) throw {status:401, error:'NOT AUTHORIZED'};

        const {accessToken, refreshToken} = await user.getToken()

        return {accessToken, refreshToken, user}
      
    }
  }
}

export default Resolvers;
