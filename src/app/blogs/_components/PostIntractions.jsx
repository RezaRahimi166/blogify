"use client";
import { toPersianDigits } from "@/lib/numberFormatter";
import { bookmarkPostApi, likePostApi } from "@/services/postServices";
import ButtonIcon from "@/ui/ButtonIcon";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as SolidBookmark,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const PostIntractions = ({ post }) => {
  const router = useRouter();
  const likeHandler = async (postId) => {
    try {
      const { data, message } = await likePostApi(postId);
      toast.success(message);
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.messsage);
    }
  };
  const bookmarkedHandler = async (postId) => {
    try {
      const { data, message } = await bookmarkPostApi(postId);
      toast.success(message);
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.messsage);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <ButtonIcon variant={"secondary"}>
        <ChatBubbleOvalLeftEllipsisIcon />
        <span>{toPersianDigits(post.commentsCount)}</span>
      </ButtonIcon>
      <ButtonIcon variant={"red"} onClick={() => likeHandler(post._id)}>
        {post.isLiked ? <SolidHeartIcon /> : <HeartIcon />}
      </ButtonIcon>
      <ButtonIcon
        variant={"primary"}
        onClick={() => bookmarkedHandler(post._id)}
      >
        {post.isBookmarked ? <SolidBookmark /> : <BookmarkIcon />}
      </ButtonIcon>
    </div>
  );
};

export default PostIntractions;
