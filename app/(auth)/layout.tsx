// 在 (auth) 資料夾建立 layout.tsx (AuthLayout) ，在此添加的組件及樣式設定會套用在 auth 資料夾下的頁面。

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="border border-gray-200 p-8 rounded-md">
      {children}
    </section>
  );
}
