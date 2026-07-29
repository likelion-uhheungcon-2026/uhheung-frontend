import Header from "./Header";
import Links from "./Links";
import MainCard from "./MainCard";
import Content from "./Content";

export default function BoothDetail({ booth, isOpen, setIsOpen }) {
  return (
    <div
      className={`
        absolute bottom-0 left-0 w-full
        flex flex-col
        rounded-t-[0.625rem]
        z-100
        bg-[#010101]
        px-[1.31rem]
        text-white
        transition-all duration-300 ease-in-out
        ${isOpen ? "h-screen" : "h-[26rem]"}
      `}
    >
      {/* Header 고정 */}
      <div className="shrink-0 w-full bg-[#010101]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[2rem] flex justify-center pt-[0.6rem]"
        >
          <div className="w-[4.375rem] h-[0.25rem] rounded-full bg-[#363636]" />
        </button>

        <Header booth={booth} />
      </div>

      {/* 스크롤 영역 */}
      <div
        className="
          relative
          flex-1
          min-h-0
          w-full
          overflow-y-auto
          scrollbar-hide
          overscroll-contain
          mt-[1rem]
        "
      >
        <MainCard booth={booth} />
        <Links booth={booth} />
        <Content booth={booth} />

        {/* 하단 그라데이션 */}
        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-[4.5rem]
            pointer-events-none
            bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_80%)]
          "
        />
      </div>
    </div>
  );
}
