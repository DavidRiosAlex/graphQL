import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    encodedPassword: String,
    username: String,
    salt: String,
    enabled: Boolean,
    created: Date,
    updated: Date
})

UserSchema.index({'username':1,},{unique:true})
UserSchema.index({'name':1});
UserSchema.index({'lastname':1});

UserSchema.methods = {
    authenticate: (password)=>{
        const passwordToAuthenticate = crypto.createHmac('sha256',this.salt).update(password).digest('hex');
        if (passwordToAuthenticate === this.encodedPassword) return true
        else return false
    }
};

UserSchema.virtual('password').set((password)=>{
    this.salt = Math.floor(Date.now().valueOf() * Math.random());
    this.simplePassword = password;
    this.encodedPassword = crypto.createHmac('sha256',this.salt).update(password).digest('hex');
}).get(()=>{
    return this.simplePassword;
})

UserSchema.pre('save', (next)=>{
    this.updated = Date.now();
    if (!this.isNew) return next();

    this.created = Date.now();
    this.enabled = true;

    return next();
})


const User = mongoose.model('User',UserSchema);

export default User;