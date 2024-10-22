import Spinner from "@/ui/Spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-x-4">
      <span className="text-lg text-secondary-500">درحال بارگذاری اطلاعات</span>
      <Spinner />
    </div>
  );
};

export default Loading;
