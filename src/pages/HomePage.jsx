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
  const [sheetStage, setSheetStage] = useState(1);

  const [selectedBoothId, setSelectedBoothId] = useState(
    location.state?.boothId ?? 1,
  );

  const selectedBooth = booths.find((booth) => booth.id === selectedBoothId);

  const handleTabChange = (nextTab) => {
    if (nextTab === tab) return;

    setTab(nextTab);
    setSheetStage(1);
  };

  return (
    <div className=" relative min-h-screen overflow-hidden">
      <HomeBtn tab={tab} setTab={handleTabChange} />

      <div
        className={`${tab === "booth" ? "h-[18rem]" : "h-[22rem]"} bg-[#141414]`}
      >
        {tab === "booth" ? (
          <BoothMap
            setSelectedBoothId={setSelectedBoothId}
            selectedBoothId={selectedBoothId}
          />
        ) : (
          <TimeTable />
        )}
      </div>

      <div>
        {tab === "booth" ? (
          <BoothDetail
            booth={selectedBooth}
            sheetStage={sheetStage}
            setSheetStage={setSheetStage}
            key={selectedBoothId}
          />
        ) : (
          <RecommendedBooth
            booths={booths}
            sheetStage={sheetStage}
            setSheetStage={setSheetStage}
            setSelectedBoothId={setSelectedBoothId}
            setTab={handleTabChange}
          />
        )}
      </div>
    </div>
  );
}
