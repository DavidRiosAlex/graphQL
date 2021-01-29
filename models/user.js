import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  encodedPassword: String,
  username: String,
  salt: String,
  enabled: Boolean,
  created: Date,
  updated: Date,
});

UserSchema.index({'username': 1}, {unique: true});
UserSchema.index({'name': 1});
UserSchema.index({'lastname': 1});

UserSchema.methods = {
  authenticate: function(password) {
    const passwordToAuthenticate = crypto.createHmac('sha256', this.salt)
        .update(password)
        .digest('hex');

    if (passwordToAuthenticate === this.encodedPassword) return true;
    else return false;
  },
  getToken(){
    const info = {
      entity:'user',
      role:'user', 
      username: this.username, 
      type: 'access'
    };
    const infoRefresh = {...info, type:'refresh'};
    const token = jwt.sign(info,process.env.API_KEY,{expiresIn:360000});
    const refresh_token = jwt.sign(infoRefresh, process.env.API_KEY, {expiresIn:360000})

    return {token, refresh_token}
  }
};

UserSchema.virtual('password').set(function(password) {
  this.salt = Math.floor(Date.now().valueOf() * Math.random());
  this.simplePassword = password;
  this.encodedPassword = crypto.createHmac('sha256', this.salt)
      .update(password)
      .digest('hex');
}).get(()=>{
  return this.simplePassword;
});

UserSchema.pre('save', function(next) {
  this.updated = Date.now();
  if (!this.isNew) return next();

  this.created = Date.now();
  this.enabled = true;

  return next();
});


const User = mongoose.model('User', UserSchema);

export default User;
