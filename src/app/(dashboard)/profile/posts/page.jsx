import { Suspense } from "react";
import PostTable from "./-/components/PostTable";
import Fallback from "@/ui/Fallback";
import Search from "@/ui/Search";
import { CreatePost } from "./-/components/Buttons";
import queryString from "query-string";
import { getPosts } from "@/services/postServices";
import Pagination from "@/ui/Pagination";

const Posts = async ({ searchParams }) => {
  const query = queryString.stringify(searchParams);
  const { totalPages } = await getPosts(query);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center text-secondary-700 mb-12">
        <h1 className="font-bold text-xl">لیست پست ها</h1>
        <Search />
        <CreatePost />
      </div>
      <Suspense fallback={<Fallback />} key={query}>
        <PostTable query={query} />
      </Suspense>
      <div className="flex justify-center mt-5 w-full ">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Posts;
