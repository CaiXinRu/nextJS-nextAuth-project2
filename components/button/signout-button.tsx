// 使用 signOut function 從 next-auth 中進行登出。
"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`,
    });
  };

  return (
    <Button onClick={signout} variant="destructive">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
