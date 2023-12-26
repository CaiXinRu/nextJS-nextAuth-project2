// 為解決在提取 session 中的 user 資料時遇到的類型問題，
// 新增 types 資料夾，並創建 next-auth.d.ts 來定義相關的 TypeScript 類型。

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    role: string;
    provider: string;
  }
  interface Session {
    user: User & {
      _id: string;
      role: string;
      provider: string;
    };
    token: {
      _id: string;
      role: string;
      provider: string;
    };
  }
}
