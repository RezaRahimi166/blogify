import vazirFont from "@/constants/localFont";
import "./styles/globals.css";
import Header from "@/components/Header";

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
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-sans min-h-screen`}>
        <Header />
        <div className="container xl:max-w-screen-xl">{children}</div>
      </body>
    </html>
  );
}
