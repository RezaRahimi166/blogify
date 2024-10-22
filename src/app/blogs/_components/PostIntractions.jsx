import { toPersianDigits } from "@/lib/numberFormatter";
import ButtonIcon from "@/ui/ButtonIcon";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const PostIntractions = ({ post }) => {
  return (
    <div className="flex items-center gap-x-4">
      <ButtonIcon variant={"secondary"}>
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant={"red"}>
        <HeartIcon />
      </ButtonIcon>
      <ButtonIcon variant={"primary"}>
        <BookmarkIcon />
      </ButtonIcon>
    </div>
  );
};

export default PostIntractions;
