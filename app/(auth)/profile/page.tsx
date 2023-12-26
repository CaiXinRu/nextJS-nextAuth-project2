// 在 “use client” 組件使用 server action 的方式：
// 在 use server 頁面（ProfilePage）將 server action（updateUserProfile）作為 props
// 傳給 use client 組件（UpdateForm），在 auth.actions.ts 中加上 “use server”。

import UpdateForm from "@/components/form/update-form";
import { updateUserProfile } from "@/lib/actions/auth.actions";

const ProfilePage = async () => {
  return (
    <div className="w-full">
      <UpdateForm updateUserProfile={updateUserProfile} />
    </div>
  );
};

export default ProfilePage;
