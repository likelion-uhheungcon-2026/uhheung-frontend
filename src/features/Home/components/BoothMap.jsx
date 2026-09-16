import { booths } from "../../../data/booths";
import Booth from "./Booth";

import corner1 from "../assets/right1.svg";
import corner2 from "../assets/left1.svg";
import corner4 from "../assets/left2.svg";
import corner5 from "../assets/right2.svg";

const boothSections = [
  {
    title: "CONNECT",
    start: 0,
    end: 5,
    width: "w-[85%]",
    color: "#FF781F",
  },
  {
    title: "WELLNESS",
    start: 5,
    end: 10,
    width: "w-[85%]",
    color: "#F2E6CF",
  },
  {
    title: "CARE",
    start: 10,
    end: 15,
    width: "w-[85%]",
    color: "#FF9A62",
  },
  {
    title: "EXPERIENCE",
    start: 15,
    end: 21,
    width: "w-full",
    color: "#EED56A",
  },
];

export default function BoothMap({ selectedBoothId, setSelectedBoothId }) {
  return (
    <div className="relative mt-[1rem] flex w-full justify-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[7.7rem] flex h-[5rem] w-[1.25rem] items-center justify-center rounded-r-[0.35rem] bg-[#292929] text-[#9A9A9A]"
      >
        <span className="absolute  top-[0.8rem] h-[0.25rem] w-[0.87rem] rounded-full bg-[#FF6000]" />
        <span className="font-sbaggro -rotate-270 whitespace-nowrap text-[0.72rem] font-light tracking-[0.08em]">
          입구
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[4.55rem] flex h-[11.25rem] w-[1.25rem] items-center justify-center rounded-l-[0.35rem] bg-[#292929] text-[#9A9A9A]"
      >
        <span className="font-sbaggro rotate-90 whitespace-nowrap text-[0.72rem] font-light tracking-[0.12em]">
          STAGE
        </span>
      </div>

      <div className="relative w-[calc(100%-3.75rem)] max-w-[17.5rem] text-white">
        <img
          src={corner1}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[-0.1rem] top-[3.6rem] h-[3.75rem] w-[1rem] object-contain"
        />
        <img
          src={corner2}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-2.5rem] top-[4.9rem] h-auto w-[4rem] object-contain"
        />
        <img
          src={corner4}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[1.7rem] left-[-1.3rem] h-auto w-[3rem] object-contain"
        />
        <img
          src={corner5}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[0.7rem] right-[-1.9rem] h-[1.5625rem] w-[1.5625rem] object-contain"
        />

        <div className="flex flex-col gap-[0.18rem]">
          {boothSections.map((section) => {
            const sectionBooths = booths.slice(section.start, section.end);

            return (
              <section
                key={section.title}
                aria-labelledby={`booth-section-${section.title}`}
                className="flex flex-col items-center gap-[0.08rem]"
              >
                <h2
                  id={`booth-section-${section.title}`}
                  style={{ color: section.color }}
                  className="font-sbaggro mt-[0.7rem] mb-[-0.05rem] text-[clamp(0.7rem,3.5vw,0.875rem)] font-light leading-none tracking-[0.02em]"
                >
                  {section.title}
                </h2>

                <div
                  className={`${section.width} grid gap-[0.28rem]`}
                  style={{
                    gridTemplateColumns: `repeat(${sectionBooths.length}, minmax(0, 1fr))`,
                  }}
                >
                  {sectionBooths.map((booth) => (
                    <Booth
                      key={booth.id}
                      booth={booth}
                      selectedBoothId={selectedBoothId}
                      setSelectedBoothId={setSelectedBoothId}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
