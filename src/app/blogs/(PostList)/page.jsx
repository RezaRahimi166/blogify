import PostList from "../_components/PostList";
import { getPosts } from "@/services/postServices";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";

// how to revalidate, time-based :

// export const revalidate = 0; // opt out => dynamic (!!!)
// export const dynamic = "force-dynamic"; // opt out => dynamic (!!!)

// export const revalidate = 15; // after 15 => re-build =>
//  1. pass time interval
//  + 2.new incoming request to build thes page =>
// updated data will be shown to next user !! =>
// ISR => Incermental Static re-generetion
const BlogPage = async () => {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(options);
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default BlogPage;
