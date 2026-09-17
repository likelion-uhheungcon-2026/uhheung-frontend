import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { booths } from "../data/booths";

import HomeBtn from "../features/Home/components/HomeBtn";
import BoothMap from "../features/Home/components/BoothMap";
import TimeTable from "../features/Home/components/TimeTable";
import BoothDetail from "../features/BoothDetail/components/BoothDetail";
import RecommendedBooth from "../features/Recommend/components/RecommendedBooth";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tab, setTab] = useState(() =>
    location.state?.tab === "time" ? "time" : "booth",
  );
  const [sheetStage, setSheetStage] = useState(1);

  const [selectedBoothId, setSelectedBoothId] = useState(
    location.state?.boothId ?? 1,
  );

  const selectedBooth = booths.find((booth) => booth.id === selectedBoothId);

  const handleTabChange = (nextTab) => {
    if (nextTab === tab) return;

    setTab(nextTab);
    setSheetStage(1);
    navigate("/home", {
      replace: true,
      state: { ...(location.state ?? {}), tab: nextTab },
    });
  };

  return (
    <div className="app-viewport relative flex min-h-0 flex-col overflow-hidden">
      <HomeBtn tab={tab} setTab={handleTabChange} />

      <div
        className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#141414] pb-[max(5rem,env(safe-area-inset-bottom))]"
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
          />
        )}
      </div>
    </div>
  );
}
