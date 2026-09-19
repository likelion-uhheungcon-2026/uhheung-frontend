import { useEffect, useMemo, useState } from "react";
import { compareBoothsByRecommendation } from "../../../utils/boothRankings";

export default function BigCard({ booths, onBoothClick }) {
  const recommendBooths = useMemo(
    () => [...booths].sort(compareBoothsByRecommendation).slice(0, 5),
    [booths],
  );

  const [current, setCurrent] = useState(0);

  // 3초마다 자동 슬라이드
  useEffect(() => {
    if (recommendBooths.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % recommendBooths.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [recommendBooths.length]);

  if (recommendBooths.length === 0) return null;

  const currentIndex = current % recommendBooths.length;
  const booth = recommendBooths[currentIndex];

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
    overflow-hidden
    cursor-pointer
  "
    >
      <img
        src={booth.serviceimage}
        alt={booth.name}
        loading="lazy"
        decoding="async"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,rgba(20,20,20,0)_50%,#141414_100%)]
        "
      />

      <button
        type="button"
        onClick={() => onBoothClick(booth.id)}
        aria-label={`${booth.name} 작품 상세 보기`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          px-[1.1rem]
          pb-[1.2rem]
          text-white
          z-10
          pointer-events-none
        "
      >
        <div className="flex justify-between items-end">
          <div className="text-[1rem] font-sbaggro">추천 작품</div>

          <div className="flex flex-col items-end text-[0.875rem] font-sbaggro">
            <div>{booth.id}번</div>
            <div>
              {booth.name} | {booth.team}
            </div>
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div
        className="
          absolute
          left-1/2
          -translate-x-1/2
          bottom-[0.6rem]
          flex
          items-center
          gap-[0.25rem]
          z-20
        "
      >
        {recommendBooths.map((recommendBooth, index) => (
          <button
            key={recommendBooth.id}
            type="button"
            aria-label={`${index + 1}번째 추천 작품 보기`}
            onClick={(event) => {
              event.stopPropagation();
              setCurrent(index);
            }}
            className={`
              rounded-full
              transition-[width,height,background-color]
              duration-300
              ${
                currentIndex === index
                  ? "h-[0.375rem] w-[0.375rem] bg-[#FF6000]"
                  : "h-[0.25rem] w-[0.25rem] bg-[#8c8c8c]"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
