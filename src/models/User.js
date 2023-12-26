import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { users } from "../controllers/userController";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  socialAccount: { type: Boolean, default: false }, // user가 Github로 로그인했는지 여부를 알기 위해서
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true },
  location: { type: String },
  videos: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5); // 여기서 this는 await User.create()
});

const User = mongoose.model("User", userSchema);
export default User;
