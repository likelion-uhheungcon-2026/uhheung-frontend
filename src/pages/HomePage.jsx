import { useEffect, useState } from "react";
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

  // 추가
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const h = window.innerHeight;

      if (h <= 670) setScale(0.7);
      else if (h <= 740) setScale(0.76);
      else if (h <= 820) setScale(0.84);
      else setScale(1);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const selectedBooth = booths.find((booth) => booth.id === selectedBoothId);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HomeBtn tab={tab} setTab={setTab} />

      <div className="h-[22rem] bg-[#141414]">
        {tab === "booth" ? (
          <BoothMap
            scale={isDetailOpen ? 1 : scale}
            selectedBoothId={selectedBoothId}
            setSelectedBoothId={setSelectedBoothId}
            setIsDetailOpen={setIsDetailOpen}
          />
        ) : (
          <TimeTable scale={isDetailOpen ? 1 : scale} />
        )}
      </div>

      {tab === "booth" ? (
        <BoothDetail
          booth={selectedBooth}
          isOpen={isDetailOpen}
          setIsOpen={setIsDetailOpen}
          key={selectedBoothId}
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
  );
}
