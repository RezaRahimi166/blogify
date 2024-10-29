import { getPostById } from "@/services/postServices";
import Breadcrumbs from "@/ui/Breadcrumbs";
import { notFound } from "next/navigation";
import React from "react";
import CreatePostForm from "../../create/-/CreatePostForm";

async function editePost({ params: { postId } }) {
  const { post } = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${postId}/edit`,
            active: true,
          },
        ]}
      />
      <CreatePostForm postToEdit={post} />
    </div>
  );
}

export default editePost;
