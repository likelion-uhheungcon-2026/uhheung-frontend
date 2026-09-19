import { useMemo } from "react";
import { compareBoothsByRecommendation } from "../../../utils/boothRankings";
import { useCarousel } from "../../../hooks/useCarousel";

export default function BigCard({ booths, onBoothClick }) {
  const recommendBooths = useMemo(
    () => [...booths].sort(compareBoothsByRecommendation).slice(0, 5),
    [booths],
  );

  const carousel = useCarousel({
    length: recommendBooths.length,
    resetKey: recommendBooths.map((booth) => booth.id).join(","),
  });

  if (recommendBooths.length === 0) return null;

  const booth = recommendBooths[carousel.currentIndex];

  return (
    <div
      className="
    relative
    w-full
    h-auto
    min-h-0
    max-h-[9.96875rem]
    flex-1
    rounded-[0.625rem]
    isolate
    bg-[#141414]
    cursor-pointer
  "
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[0.625rem] bg-[#141414]"
        style={{
          clipPath: "inset(0 round 0.625rem)",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        <img
          src={booth.serviceimage}
          alt={booth.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0)_50%,#141414_100%)]" />

        <button
          type="button"
          onPointerDown={carousel.pointerHandlers.onPointerDown}
          onPointerMove={carousel.pointerHandlers.onPointerMove}
          onPointerUp={carousel.pointerHandlers.onPointerUp}
          onPointerCancel={carousel.pointerHandlers.onPointerCancel}
          onClick={(event) => {
            if (carousel.consumeSwipe()) {
              event.preventDefault();
              return;
            }
            onBoothClick(booth.id);
          }}
          style={{ touchAction: "pan-y" }}
          aria-label={`${booth.name} 작품 상세 보기`}
          className="absolute inset-0 z-10 cursor-pointer"
        />

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full px-[1.1rem] pb-[1.2rem] text-white">
          <div className="flex items-end justify-between">
            <div className="font-sbaggro text-[1rem]">추천 작품</div>

            <div className="font-sbaggro flex flex-col items-end text-[0.875rem]">
              <div>{booth.id}번</div>
              <div>
                {booth.name} | {booth.team}
              </div>
            </div>
          </div>
        </div>

        {/* 인디케이터 */}
        <div className="absolute bottom-[0.6rem] left-1/2 z-20 flex -translate-x-1/2 items-center gap-[0.25rem]">
          {recommendBooths.map((recommendBooth, index) => (
            <button
              key={recommendBooth.id}
              type="button"
              aria-label={`${index + 1}번째 추천 작품 보기`}
              onPointerDown={(event) => event.stopPropagation()}
              onPointerUp={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                carousel.selectIndex(index);
              }}
              className="flex h-[1.25rem] w-[0.9rem] touch-manipulation cursor-pointer items-center justify-center"
            >
              <span
                className={`rounded-full transition-[width,height,background-color] duration-300 ${
                  carousel.currentIndex === index
                    ? "h-[0.375rem] w-[0.375rem] bg-[#FF6000]"
                    : "h-[0.25rem] w-[0.25rem] bg-[#8c8c8c]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Figma의 Stroke Center처럼 카드 경계에 걸치는 전체 테두리 */}
      <div className="pointer-events-none absolute -inset-[0.1px] z-30 rounded-[calc(0.625rem+0.1px)] border-[0.2px] border-black" />
    </div>
  );
}
