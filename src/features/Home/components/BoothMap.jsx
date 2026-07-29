import { booths } from "../../../data/booths";
import Booth from "./Booth";

export default function BoothMap({ setSelectedBoothId }) {
  return (
    <div className="text-white">
      {booths.map((booth) => (
        <Booth
          key={booth.id}
          booth={booth}
          setSelectedBoothId={setSelectedBoothId}
        />
      ))}
    </div>
  );
}
