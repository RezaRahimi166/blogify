import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllCommentsApi } from "./commentService";
import { getAllUserApi } from "./authService";
import { getPosts } from "./postServices";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);

  try {
    const data = await Promise.all([
      getAllUserApi(options),
      getAllCommentsApi(options),
      getPosts(),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfPosts = Number(data[2].posts.length ?? "0");
    const numberOfComments = Number(data[1].commentsCount ?? "0");

    return {
      numberOfUsers,
      numberOfPosts,
      numberOfComments,
    };
  } catch (error) {
    console.log(error?.response?.data?.message);
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}
