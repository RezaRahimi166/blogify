"use client";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import Link from "next/link";
import { useState } from "react";
import useDeletePost from "../useDeletePost";
import { useRouter } from "next/navigation";

const { default: ButtonIcon } = require("@/ui/ButtonIcon");
const {
  TrashIcon,
  PencilIcon,
  PlusIcon,
} = require("@heroicons/react/24/outline");

export function CreatePost() {
  return (
    <Link
      href={"/profile/posts/create"}
      className="justify-self-end gap-x-4 flex py-3 items-center  rounded-lg bg-primary-900 px-4 text-sm font-medium transition-colors hover:bg-primary-700 "
    >
      <span className="hidden md:block">ایجاد پست</span>
      <PlusIcon className="w-5" />
    </Link>
  );
}

const DeletePost = ({ post: { _id: id, title } }) => {
  const [open, setOpen] = useState(false);
  const { isDeleting, deletePost } = useDeletePost();
  const router = useRouter();

  return (
    <>
      <ButtonIcon variant={"outline"} onClick={() => setOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>
      <Modal title={`حذف ${title}`} open={open} onClose={() => setOpen(false)}>
        <ConfirmDelete
          resourceName={title}
          onClose={() => setOpen(false)}
          disabled={isDeleting}
          onConfirm={(e) => {
            e.preventDefault();
            deletePost(
              { id },
              {
                onSuccess: () => {
                  setOpen(false);
                  router.refresh("/profile/posts");
                },
              }
            );
          }}
        />
      </Modal>
    </>
  );
};
const EditPost = ({ id }) => {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon variant={"outline"}>
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
};

export { DeletePost, EditPost };
