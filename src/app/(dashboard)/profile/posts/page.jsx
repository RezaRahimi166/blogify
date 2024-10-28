import { Suspense } from "react";
import PostTable from "./-/components/PostTable";
import Fallback from "@/ui/Fallback";

const Posts = () => {
  return (
    <div>
      <Suspense fallback={<Fallback />}>
        <PostTable />
      </Suspense>
    </div>
  );
};

export default Posts;
