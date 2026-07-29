import { useState } from "react";
import HomeBtn from "../features/Home/components/HomeBtn";
import BoothMap from "../features/Home/components/BoothMap";
import TimeTable from "../features/Home/components/TimeTable";
import BoothDetail from "../features/BoothDetail/components/BoothDetail";
import RecommendedBooth from "../features/Recommend/components/RecommendedBooth";

export default function HomePage() {
  const [tab, setTab] = useState("booth");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HomeBtn tab={tab} setTab={setTab} />

      <div className="h-[22rem] bg-[#141414]">
        {tab === "booth" ? <BoothMap /> : <TimeTable />}
      </div>

      <div>
        {tab === "booth" ? (
          <BoothDetail isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} />
        ) : (
          <RecommendedBooth isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} />
        )}
      </div>
    </div>
  );
}
