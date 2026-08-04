import { useState } from "react";

import Header from "./Header";
import Links from "./Links";
import MainCard from "./MainCard";
import Content from "./Content";

export default function BoothDetail({ booth, isOpen, setIsOpen }) {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // 바닥에서 5px 이내면 끝으로 판단
    setIsBottom(scrollTop + clientHeight >= scrollHeight - 5);
  };

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
        ${isOpen ? "h-[calc(100vh-4.15rem)] sm:h-[calc(100vh-7.25rem)]" : "h-[26rem] "}
      `}
    >
      <div className="shrink-0 w-full bg-[#010101]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[2rem] flex justify-center pt-[0.6rem]"
        >
          <div className="w-[4.375rem] h-[0.25rem] rounded-full bg-[#363636]" />
        </button>

        <Header booth={booth} />
      </div>

      <div
        onScroll={handleScroll}
        className="
          relative
          flex-1
          min-h-0
          w-full
          overflow-y-auto
          overflow-x-hidden
          scrollbar-hide
          overscroll-contain
          mt-[0.5rem]

        "
      >
        <MainCard booth={booth} />
        <Links booth={booth} />
        <Content booth={booth} />

        {!isBottom && (
          <div
            className="
              sticky
              bottom-0
              
              w-full
              h-[4.5rem]
              -mb-[0.2rem]
              pointer-events-none
              bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000_80%)]
            "
          />
        )}
      </div>
    </div>
  );
}
