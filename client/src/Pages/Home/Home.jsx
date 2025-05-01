import ProgressTable from "../../components/Home/ProgressTable";
import UserStats from "../../components/Home/UserStats";
import HomeHeader from "../../components/layouts/HomeHeader";

export default function Home() {
  return (
    <div className="w-full p-2 flex flex-col justify-center gap-20 items-center">
      <HomeHeader />
      <UserStats />
      <ProgressTable />
    </div>
  );
}
