import { booths } from "../../../data/booths";
import Booth from "./Booth";

import plane from "../assets/plane.svg";
import corner1 from "../assets/corner1.svg";
import corner2 from "../assets/corner2.svg";
import corner3 from "../assets/corner3.svg";
import corner4 from "../assets/corner4.svg";
import corner5 from "../assets/corner5.svg";

export default function BoothMap({ selectedBoothId, setSelectedBoothId }) {
  return (
    <div className="booth-scale mt-[1rem] flex justify-center">
      <div className="w-[18.75rem]">
        {/* Plane */}
        <div className="flex justify-center mb-[0.3rem]">
          <img src={plane} alt="" className="w-[11.28125rem] h-[1rem]" />
        </div>

        {/* Map */}
        <div className="relative">
          {/* 왼쪽 Corner */}
          <img
            src={corner2}
            alt=""
            className="scale-y-105 absolute left-[-2.2875rem] top-[3.75rem] w-[2.1875rem] h-[6.25rem] pointer-events-none"
          />

          <img
            src={corner4}
            alt=""
            className="absolute left-[-2.2875rem] top-[11.25rem] w-[2.1875rem] h-[6.25rem] pointer-events-none"
          />

          {/* 오른쪽 Corner */}
          <img
            src={corner1}
            alt=""
            className="absolute right-[-2.1875rem] top-0 w-[2.1875rem] h-[6.25rem] pointer-events-none"
          />

          <img
            src={corner3}
            alt=""
            className="absolute right-[-2.1875rem] top-[7.5rem] w-[2.1875rem] h-[6.25rem] pointer-events-none"
          />

          <img
            src={corner5}
            alt=""
            className="absolute right-[-2.1875rem] top-[16.35rem] -translate-y-1/2 w-[2.1875rem] h-[6.25rem] pointer-events-none"
          />

          {/* Booth Grid */}
          <div className="grid grid-cols-8 gap-x-0 gap-y-[1.25rem] text-white">
            {booths.map((booth, index) => (
              <Booth
                key={booth.id}
                booth={booth}
                column={Math.floor(index / 8) + 1}
                selectedBoothId={selectedBoothId}
                setSelectedBoothId={setSelectedBoothId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
