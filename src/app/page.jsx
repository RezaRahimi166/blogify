import Button from "@/ui/Button";
import Link from "next/link";

export const metadata = {
  title: "خانه | بلاگیفای",
};

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-center text-2xl md:text-5xl text-secondary-800 my-20">
        به بلاگیفای خوش آمدید
      </h1>
      <div>
        <p className="text-center text-secondary-500 text-lg leading-loose ">
          {" "}
          خدمات ما شامل - ایجاد پست جدید - مدیریت پست ها -کامنت گذاری و مدیریت
          پنل
        </p>
        <div className="flex justify-center gap-x-8 w-full mt-10">
          <Button variant="outline">
            <Link href={"/blogs"}>مطالعه ی بلاگ ها</Link>
          </Button>
          <Button variant="primary">
            <Link href={"/profile"}>مدیریت بلاگ ها</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
