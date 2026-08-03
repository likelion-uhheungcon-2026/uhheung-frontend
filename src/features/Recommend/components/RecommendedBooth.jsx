import { useNavigate } from "react-router-dom";

import SmallCard from "./SmallCard";
import BigCard from "./BigCard";

export default function RecommendedBooth({
  booths,
  isOpen,
  setIsOpen,
  setSelectedBoothId,
  setTab,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/servicelist");
  };

  return (
    <div
      className={`
        absolute bottom-0 left-0 w-full
        flex flex-col justify-start items-center
        h-screen
        rounded-t-[0.625rem]
        z-[100]
        bg-[#010101]
        px-[1.31rem]
        text-white
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-24rem)]"}
      `}
    >
      {/* 핸들 영역 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[2rem] flex justify-center pt-[0.6rem]"
      >
        <div className="w-[4.375rem] h-[0.25rem] rounded-full bg-[#363636]" />
      </button>

      <div className="flex flex-col gap-[0.5rem]">
        <BigCard
          booths={booths}
          setSelectedBoothId={setSelectedBoothId}
          setIsOpen={setIsOpen}
          setTab={setTab}
        />

        <div className="flex justify-center gap-[0.5rem]">
          <SmallCard
            title="최다 조회수"
            boothId={1} // 하드코딩
            setSelectedBoothId={setSelectedBoothId}
            setIsOpen={setIsOpen}
            setTab={setTab}
            booths={booths}
          />

          <SmallCard
            title="최고 조회시간"
            boothId={2} // 하드코딩
            setSelectedBoothId={setSelectedBoothId}
            setIsOpen={setIsOpen}
            setTab={setTab}
            booths={booths}
          />
        </div>
      </div>

      <button
        onClick={handleClick}
        className="mt-[1.3rem] text-[0.875rem] font-extralight text-[#FF6000] cursor-pointer"
      >
        출품작 전체보기 →
      </button>
    </div>
  );
}
