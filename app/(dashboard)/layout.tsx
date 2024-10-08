import "@/css/satoshi.css";
import "@/css/style.css";
import Loader from "@/components/common/Loader";
import AuthProvider from "@/app/context/AuthProvider";
import { generateNotifications } from "../actions/action";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await generateNotifications();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <Loader />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
