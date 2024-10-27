import PostList from "../_components/PostList";
import { getPosts } from "@/services/postServices";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";
import queryString from "query-string";

// how to revalidate, time-based :

// export const revalidate = 0; // opt out => dynamic (!!!)
// export const dynamic = "force-dynamic"; // opt out => dynamic (!!!)

// export const revalidate = 15; // after 15 => re-build =>
//  1. pass time interval
//  + 2.new incoming request to build thes page =>
// updated data will be shown to next user !! =>
// ISR => Incermental Static re-generetion
const BlogPage = async ({ searchParams }) => {
  const queries = queryString.stringify(searchParams);

  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(queries, options);

  const { search } = searchParams;

  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات پیدا نشد"
            : `نشان دادن ${posts.length} نتیجه برای`}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}
      <PostList posts={posts} />
    </>
  );
};

export default BlogPage;
