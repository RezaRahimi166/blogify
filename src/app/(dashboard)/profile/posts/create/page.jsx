import Breadcrumbs from "@/ui/Breadcrumbs";
import React from "react";
import CreatePostForm from "./-/CreatePostForm";

const CreatePost = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ایجاد پست",
            href: "/profile/posts/create",
            active: true,
          },
        ]}
      />
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
