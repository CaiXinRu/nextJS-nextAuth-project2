import * as z from "zod";

export const userSignInValidation = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be 8+ characters"),
});

export const userSignUpValidation = z
  .object({
    name: z
      .string()
      .min(1, "Username is required")
      .max(50, "Username must be less than 50 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    oldPassword: z
      .string()
      .min(1, "Old password is required")
      .min(8, "Password must be 8+ characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must differ from old",
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

// 建立用戶資料更新頁面，新增userUpdateValidation來驗證用戶輸入
export const userUpdateValidation = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters"),
});

// 新增 changeUserPassword 以處理密碼變更請求，使用 bcrypt 驗證舊密碼並加密新密碼
export const changePasswordValidation = z
  .object({
    oldPassword: z
      .string()
      .min(1, "Old password is required")
      .min(8, "Password must be 8+ characters"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be 8+ characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must differ from old",
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
