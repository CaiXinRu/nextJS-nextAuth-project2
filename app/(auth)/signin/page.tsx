// (auth) 資料夾中，建立 signup 路徑內容及 signin 路徑內容，並且將當中會使用 “use client” 的表單獨立成 SignUpForm、SignInForm 組件。

import SignInForm from "@/components/form/signin-form";

interface SignInPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignInPage = ({ searchParams: { callbackUrl } }: SignInPageProps) => {
  // console.log(callbackUrl)
  return (
    <div className="w-full">
      <SignInForm callbackUrl={callbackUrl || "/"} />
    </div>
  );
};

export default SignInPage;
