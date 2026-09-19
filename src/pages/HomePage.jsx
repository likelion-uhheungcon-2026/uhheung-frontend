import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBoothDetail, useBooths } from "../api/booths";
import { useBoothView } from "../api/views";

import HomeBtn from "../features/Home/components/HomeBtn";
import BoothMap from "../features/Home/components/BoothMap";
import TimeTable from "../features/Home/components/TimeTable";
import BoothDetail from "../features/BoothDetail/components/BoothDetail";
import RecommendedBooth from "../features/Recommend/components/RecommendedBooth";
import uhheungLogoIcon from "../features/Home/assets/uhheung-logo-icon.svg";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booths, isLoading, error } = useBooths();

  const [tab, setTab] = useState(() =>
    location.state?.tab === "time" ? "time" : "booth",
  );
  const [sheetStage, setSheetStage] = useState(1);

  const [selectedBoothId, setSelectedBoothId] = useState(
    location.state?.boothId ?? 1,
  );

  const [pickedBoothId, setPickedBoothId] = useState(null);

  useBoothView(pickedBoothId, tab === "booth");

  const selectedBoothSummary = booths.find(
    (booth) => booth.id === selectedBoothId,
  );
  const { booth: selectedBooth } = useBoothDetail(
    selectedBoothId,
    selectedBoothSummary,
  );

  const handleSelectBooth = (boothId) => {
    setSelectedBoothId(boothId);
    setPickedBoothId(boothId);
  };

  const handleTabChange = (nextTab) => {
    if (nextTab === tab) return;

    setTab(nextTab);
    setSheetStage(1);
    navigate("/home", {
      replace: true,
      state: { ...(location.state ?? {}), tab: nextTab },
    });
  };

  if (isLoading || error) {
    return (
      <div className="app-viewport flex items-center justify-center bg-[#141414] text-[0.875rem] text-[#9A9A9A]">
        {error ? "부스 정보를 불러오지 못했습니다." : "불러오는 중..."}
      </div>
    );
  }

  return (
    <div className="app-viewport relative flex min-h-0 flex-col overflow-hidden">
      <HomeBtn tab={tab} setTab={handleTabChange} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#141414] pb-[max(5rem,env(safe-area-inset-bottom))]">
        <div className="shrink-0">
          {tab === "booth" ? (
            <BoothMap
              booths={booths}
              setSelectedBoothId={handleSelectBooth}
              selectedBoothId={selectedBoothId}
            />
          ) : (
            <TimeTable />
          )}
        </div>

        <div className="pointer-events-none flex min-h-0 w-full flex-1 items-center justify-center">
          <img
            src={uhheungLogoIcon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full max-h-[14.375rem] w-full max-w-[13rem] object-contain opacity-40"
          />
        </div>
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
