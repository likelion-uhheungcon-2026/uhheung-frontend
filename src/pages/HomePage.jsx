import { useState } from "react";
import { useLocation } from "react-router-dom";
import { booths } from "../data/booths";

import HomeBtn from "../features/Home/components/HomeBtn";
import BoothMap from "../features/Home/components/BoothMap";
import TimeTable from "../features/Home/components/TimeTable";
import BoothDetail from "../features/BoothDetail/components/BoothDetail";
import RecommendedBooth from "../features/Recommend/components/RecommendedBooth";

export default function HomePage() {
  const location = useLocation();

  const [tab, setTab] = useState("booth");
  const [isDetailOpen, setIsDetailOpen] = useState(
    Boolean(location.state?.boothId),
  );

  const [selectedBoothId, setSelectedBoothId] = useState(
    location.state?.boothId ?? 1,
  );

  const selectedBooth = booths.find((booth) => booth.id === selectedBoothId);

  return (
    <div className="pt-[env(safe-area-inset-top)] relative min-h-screen overflow-hidden">
      <HomeBtn tab={tab} setTab={setTab} />

      <div className="h-[22rem] bg-[#141414]">
        {tab === "booth" ? (
          <BoothMap
            setSelectedBoothId={setSelectedBoothId}
            setIsDetailOpen={setIsDetailOpen}
          />
        ) : (
          <TimeTable />
        )}
      </div>

      <div>
        {tab === "booth" ? (
          <BoothDetail
            booth={selectedBooth}
            isOpen={isDetailOpen}
            setIsOpen={setIsDetailOpen}
          />
        ) : (
          <RecommendedBooth
            booths={booths}
            isOpen={isDetailOpen}
            setIsOpen={setIsDetailOpen}
            setSelectedBoothId={setSelectedBoothId}
            setTab={setTab}
          />
        )}
      </div>
    </div>
  );
}
