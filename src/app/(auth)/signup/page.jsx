"use client";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupApi } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = yup.object({
  name: yup
    .string()
    .min(5, "نام و نام خانودگی نامعتبر است")
    .max(30)
    .required("نام و نام خانوادگی الزامی است!"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی  است"),
  password: yup.string().required("رمز عبور الزامی است"),
});

// export const metadata = {
//   title: "ثبت نام",
// };

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const { user, message } = await signupApi(values);
      console.log(user, message);
      toast.success(message);
      router.push("profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-500 text-center mb-6 ">
        ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          label={"نام و نام خانوادگی"}
          name={"name"}
          register={register}
          isRequired
          errors={errors}
        />
        <RHFTextField
          label={"ایمیل"}
          name={"email"}
          register={register}
          dir="ltr"
          isRequired
          errors={errors}
        />
        <RHFTextField
          label={"رمز عبور"}
          name={"password"}
          register={register}
          type="password"
          dir="ltr"
          isRequired
          errors={errors}
        />
        <Button type={"submit"} variant="primary" className={"w-full"}>
          ثبت نام
        </Button>
      </form>
      <Link href={"/singin"} className="text-secondary-500 mt-6 text-center">
        ورود
      </Link>
    </div>
  );
};

export default SignUp;
