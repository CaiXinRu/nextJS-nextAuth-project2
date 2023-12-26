"use server";

// getServerSession() 方法 —
// 伺服器端（後端）使用，可以用於保護 API 路由，
// 確保只有已認證的用戶才能訪問，
// 通過解析來自客戶端的 HTTP 請求中的”Session Token”（通常存儲在 Cookie 中），
// 來確定當前的用戶身份。
import { getServerSession } from "next-auth/next";
import { Account, Profile } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { nextauthOptions } from "@/lib/nextauth-options";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user.model";

// 集中管理所有與身份驗證相關的 server actions，新增 getUserSession。
export async function getUserSession() {
  const session = await getServerSession(nextauthOptions);
  return { session };
}

interface ExtendedProfile extends Profile {
  picture?: string;
}

// 新增 signInWithOauth 來管理 OAuth 登入，並檢查用戶是否已存在於資料庫中，避免重複建立。
interface SignInWithOauthParams {
  account: Account;
  profile: ExtendedProfile;
}

export async function signInWithOauth({
  account,
  profile,
}: SignInWithOauthParams) {
  // console.log({account, profile})
  connectDB();

  const user = await User.findOne({ email: profile.email });

  if (user) return true;

  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });

  // console.log(newUser)
  await newUser.save();

  return true;
}

// 新增 getUserByEmail 從資料庫中獲取用戶信息。
interface GetUserByEmailParams {
  email: string;
}

export async function getUserByEmail({ email }: GetUserByEmailParams) {
  connectDB();

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new Error("User does not exist!");
  }

  // console.log({user})
  return { ...user._doc, _id: user._id.toString() };
}

// 新增 updateUserProfile 以處理用戶更新請求，
// 檢查用戶登入狀態，並在資料庫中更新用戶信息，
// 在更新成功時顯示成功通知，若發生錯誤則導向錯誤頁面，並顯示相應錯誤信息。
export interface UpdateUserProfileParams {
  name: string;
}

export async function updateUserProfile({ name }: UpdateUserProfileParams) {
  const session = await getServerSession(nextauthOptions);
  // console.log(session)

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const user = await User.findByIdAndUpdate(
      session?.user?._id,
      {
        name,
      },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new Error("User does not exist!");
    }

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

// 新增 signUpWithCredentials 以處理註冊請求，
// 檢查電子郵件是否已被註冊，並對密碼進行加密處理，創建新用戶並保存到資料庫中。
// 在註冊成功時顯示成功通知，並導向登入頁面；若發生錯誤則導向錯誤頁面，並顯示相應錯誤信息。
export interface SignUpWithCredentialsParams {
  name: string;
  email: string;
  password: string;
}

export async function signUpWithCredentials({
  name,
  email,
  password,
}: SignUpWithCredentialsParams) {
  connectDB();

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // console.log({newUser})
    await newUser.save();

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

// 新增 signInWithCredentials 以處理登入請求，
// 使用 bcrypt 來驗證用戶輸入的密碼，如驗證成功，返回用戶信息；如失敗，返回錯誤信息。
interface SignInWithCredentialsParams {
  email: string;
  password: string;
}

export async function signInWithCredentials({
  email,
  password,
}: SignInWithCredentialsParams) {
  connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw new Error("Invalid email or password");
  }

  return { ...user._doc, _id: user._id.toString() };
}

export interface ChangeUserPasswordParams {
  oldPassword: string;
  newPassword: string;
}

export async function changeUserPassword({
  oldPassword,
  newPassword,
}: ChangeUserPasswordParams) {
  "use server";
  const session = await getServerSession(nextauthOptions);
  // console.log(session)

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    if (session.user.provider !== "credentials") {
      throw new Error(
        `Signed in via ${session?.user?.provider}. Changes not allowed with this method.`
      );
    }

    const user = await User.findById(session.user._id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsValid) {
      throw new Error("Incorrect old password.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}
