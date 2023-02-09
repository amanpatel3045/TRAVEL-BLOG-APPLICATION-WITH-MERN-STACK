import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  // posts:[{type:mongoose.Types.ObjectId,ref:"Post"}],
});

const User = mongoose.model("user", userSchema);
export default User;
// export default const User = mongoose.model("user", userSchema);
