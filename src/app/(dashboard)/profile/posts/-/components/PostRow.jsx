import { toPersianDigits } from "@/lib/numberFormatter";
import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import truncateText from "@/utils/trancateText";
import React from "react";
import { DeletePost, EditPost } from "./Buttons";

const statusStyle = {
  free: {
    label: "رایگان",
    className: "badge--success",
  },
  premium: {
    label: "پولی",
    className: "badge--secondary",
  },
};
const PostRow = ({ index, post }) => {
  const { title, category, author, createdAt, type } = post;
  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(title, 30)}</td>
      <td>{category.title}</td>
      <td>{author.name}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${statusStyle[type].className}`}>
          {statusStyle[type].label}
        </span>
      </td>
      <div className="flex items-center gap-x-4 mt-4">
        <EditPost id={post._id} />
        <DeletePost post={post} />
      </div>
    </Table.Row>
  );
};

export default PostRow;
