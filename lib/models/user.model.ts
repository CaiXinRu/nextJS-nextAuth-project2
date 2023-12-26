// 使用 mongoose 定義 userSchema，包括使用者頭像、身份、登入提供者等，為模型添加 timestamps 屬性，以自動記錄創建和更新時間
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      default: "credentials",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
