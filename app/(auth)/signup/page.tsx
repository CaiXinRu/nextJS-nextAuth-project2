// 在 “use client” 組件使用 server action 的方式：
// 在 use server 頁面（SignUpPage）將 server action（signUpWithCredentials）
// 作為 props 傳給 use client 組件（SignUpForm）。
import { signUpWithCredentials } from "@/lib/actions/auth.actions";
// (auth) 資料夾中，
// 建立 signup 路徑內容及 signin 路徑內容，
// 並且將當中會使用 “use client” 的表單獨立成 SignUpForm、SignInForm 組件。
import SignUpForm from "@/components/form/signup-form";

interface SignUpPageProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignUpPage = ({ searchParams: { callbackUrl } }: SignUpPageProps) => {
  // console.log(callbackUrl)
  return (
    <div className="w-full">
      <SignUpForm
        callbackUrl={callbackUrl || "/"}
        signUpWithCredentials={signUpWithCredentials}
      />
    </div>
  );
};

export default SignUpPage;
