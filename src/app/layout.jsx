import vazirFont from "@/constants/localFont";
import "@/styles/globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata = {
  // title: "بلاگیفای",
  title: {
    template: "%s | بلاگیفای",
    default: "بلاگیفای",
  },
  description: " وب اپلیکیشن مدیریت بلاگ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="dark-mode">
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <Toaster />
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
