"use client";
import Link from "next/link";

const { default: ButtonIcon } = require("@/ui/ButtonIcon");
const { TrashIcon, PencilIcon } = require("@heroicons/react/24/outline");

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
