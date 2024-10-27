import Image from "next/image";
import Link from "next/link";
import React from "react";

const CoverImage = ({ title, coverImageUrl, slug }) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-sm mb-6">
      <Link href={`/blogs/${slug}`}>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          quality={80}
          className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
        />
      </Link>
    </div>
  );
};

export default CoverImage;
