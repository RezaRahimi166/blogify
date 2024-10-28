import { Suspense } from "react";
import PostTable from "./posts/-/components/PostTable";
import CardsWrapper from "./_components/CardsWrapper";
import Fallback from "@/ui/Fallback";
import LatestPost from "./_components/LatestPost";

const Profile = () => {
  return (
    <div>
      <h1 className="text-xl mb-8 text-slate-500">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardsWrapper />
      </Suspense>

      <h2 className="text-xl mb-4 text-slate-600">آخرین پست ها</h2>
      <Suspense fallback={<Fallback />}>
        <LatestPost />
      </Suspense>
    </div>
  );
};

export default Profile;
