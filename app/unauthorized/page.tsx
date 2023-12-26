// 用於存放未授權訪問的提醒頁面
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  const router = useRouter();

  return (
    <section>
      <h1 className="text-red-500 font-semibold">You Are Not Authorized!</h1>
      <Button onClick={() => router.push("/")} className="w-full mt-2">
        Go Home
      </Button>
    </section>
  );
};

export default Unauthorized;
