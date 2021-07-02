import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type:String, requred:true},
    email: {type:String, requred:true},
    password: {type:String, requred:true},
    id: {type:String}
})

export default mongoose.model('User', userSchema);

 