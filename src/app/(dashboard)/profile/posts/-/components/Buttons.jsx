"use client";
import Link from "next/link";

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

const DeletePost = ({ id }) => {
  return (
    <ButtonIcon variant={"outline"} onClick={() => console.log(id)}>
      <TrashIcon className="text-error" />
    </ButtonIcon>
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
