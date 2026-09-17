import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import SmallCard from "./SmallCard";
import BigCard from "./BigCard";

export default function RecommendedBooth({
  booths,
  sheetStage,
  setSheetStage,
}) {
  const navigate = useNavigate();
  const startY = useRef(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const recommendedStage = sheetStage > 0 ? 1 : 0;

  const handleClick = () => {
    navigate("/servicelist");
  };

  const handleBoothClick = (boothId) => {
    navigate(`/booth/${boothId}`);
  };

  const handlePointerDown = (event) => {
    startY.current = event.clientY;
    isDragging.current = true;
    didDrag.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current || startY.current === null) return;

    const distance = startY.current - event.clientY;

    if (distance > 50 && recommendedStage === 0) {
      didDrag.current = true;
      setSheetStage(1);
      startY.current = null;
      isDragging.current = false;
      return;
    }

    if (distance < -50 && recommendedStage === 1) {
      didDrag.current = true;
      setSheetStage(0);
      startY.current = null;
      isDragging.current = false;
    }
  };

  const handlePointerUp = () => {
    startY.current = null;
    isDragging.current = false;
  };

  const handleStageClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    setSheetStage((prev) => (prev > 0 ? 0 : 1));
  };

  const sheetHeightClass =
    recommendedStage === 1 ? "sheet-stage-middle" : "sheet-stage-collapsed";

  return (
    <div
      className={`
        absolute bottom-0 left-0 w-full
        flex flex-col justify-start items-center
        rounded-t-[0.625rem]
        z-[100]
        bg-[#010101]
        px-[1.31rem]
        text-white
        overflow-hidden
        transition-[height] duration-300 ease-in-out
        ${sheetHeightClass}
      `}
    >
      {/* 핸들 영역 */}
      <button
        type="button"
        onClick={handleStageClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "none" }}
        aria-label={`추천 작품 패널: ${recommendedStage === 1 ? "중간" : "접힘"} 단계`}
        className="w-full h-[2rem] shrink-0 flex justify-center pt-[0.6rem] cursor-grab"
      >
        <div className="mb-[0.6rem] w-[4.375rem] h-[0.25rem] rounded-full bg-[#363636]" />
      </button>

      <div className="relative flex h-[2.5rem] w-full shrink-0 items-start justify-center">
        <h2 className="pt-[0.08rem] font-sbaggro text-[1.3rem] leading-none">
          실시간 추천
        </h2>

        <button
          type="button"
          onClick={handleClick}
          className="absolute right-0 top-0 text-[0.875rem] font-extralight text-[#FF6000] cursor-pointer"
        >
          출품작 목록 →
        </button>
      </div>

      <div
        className={`flex w-full min-h-0 flex-1 flex-col gap-[0.5rem] overflow-hidden pb-[max(1.75rem,env(safe-area-inset-bottom))] ${
          recommendedStage > 0 ? "visible" : "invisible"
        }`}
      >
        <BigCard booths={booths} onBoothClick={handleBoothClick} />

        <div className="flex w-full min-h-0 max-h-[9.96875rem] flex-1 justify-center gap-[0.5rem]">
          <SmallCard
            title="최다 조회수"
            boothId={1} // 하드코딩
            booths={booths}
            onBoothClick={handleBoothClick}
          />

          <SmallCard
            title="최고 조회시간"
            boothId={2} // 하드코딩
            booths={booths}
            onBoothClick={handleBoothClick}
          />
        </div>
      </div>
    </div>
  );
}
