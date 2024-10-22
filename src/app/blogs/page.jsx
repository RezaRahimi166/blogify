import { Suspense } from "react";
import PostList from "./_components/PostList";
import Spinner from "@/ui/Spinner";

const BlogPage = () => {
  return (
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus nam
        beatae explicabo sit eius perferendis atque rem at et ipsa.
      </p>
      <Suspense fallback={<Spinner />}>
        <PostList />
      </Suspense>
    </div>
  );
};

export default BlogPage;
