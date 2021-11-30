import mongoose from 'mongoose';

const userSchema = ({
  username: { type: 'string', unique: true, required: true },
  createdAt: { type: Date, required: true },
})

const User = mongoose.model('User', userSchema)
export default User;