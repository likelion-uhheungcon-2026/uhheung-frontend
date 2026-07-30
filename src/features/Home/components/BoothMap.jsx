import { booths } from "../../../data/booths";
import Booth from "./Booth";

export default function BoothMap({ setSelectedBoothId }) {
  return (
    <div className="mt-[2rem] flex justify-center items-center">
      <div className="w-[18.75rem] text-white grid grid-cols-8 gap-x-[0rem] gap-y-[1rem]">
        {booths.map((booth) => (
          <Booth
            key={booth.id}
            booth={booth}
            setSelectedBoothId={setSelectedBoothId}
          />
        ))}
      </div>
    </div>
  );
}
