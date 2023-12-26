// useSession() React Hook — 客戶端（前端）使用，可以用於檢查用戶是否已經登入，在渲染過程中管理和訪問 session 狀態。

"use client";
import { useSession } from "next-auth/react";

import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.image ? (
        <Avatar className="mx-auto w-8 h-8">
          <AvatarImage src={session.user.image} alt="user avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <UserCircle2 className="mx-auto w-8 h-8" />
      )}
      <p className="w-full text-center text-xs">{session?.user?.name}</p>
    </div>
  );
};

export default UserAvatar;
