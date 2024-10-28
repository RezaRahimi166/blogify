import React from "react";
import PostTable from "../posts/-/components/PostTable";

const LatestPost = () => {
  const query = "sort=latest&limit=5";
  return <PostTable query={query} />;
};

export default LatestPost;
