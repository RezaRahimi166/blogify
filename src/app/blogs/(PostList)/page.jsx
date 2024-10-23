import { Suspense } from "react";
import PostList from "../_components/PostList";
import Spinner from "@/ui/Spinner";

// how to revalidate, time-based :

// export const revalidate = 0; // opt out => dynamic (!!!)
// export const dynamic = "force-dynamic"; // opt out => dynamic (!!!)

export const revalidate = 15; // after 15 => re-build =>
//  1. pass time interval
//  + 2.new incoming request to build thes page =>
// updated data will be shown to next user !! =>
// ISR => Incermental Static re-generetion
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
