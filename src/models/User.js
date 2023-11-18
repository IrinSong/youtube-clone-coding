import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { users } from "../controllers/userController";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5); // 여기서 this는 await User.create()
});

const User = mongoose.model("User", userSchema);
export default User;
