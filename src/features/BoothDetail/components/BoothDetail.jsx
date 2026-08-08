import { useRef, useState } from "react";

import Header from "./Header";
import Links from "./Links";
import MainCard from "./MainCard";
import Content from "./Content";

export default function BoothDetail({ booth, isOpen, setIsOpen }) {
  const [isBottom, setIsBottom] = useState(false);

  // 드래그 시작 위치
  const startY = useRef(null);

  // 드래그 시작 당시의 스크롤 위치
  const startScrollTop = useRef(0);

  // 드래그 중인지 확인
  const isDragging = useRef(false);

  // 현재 스크롤 영역
  const scrollRef = useRef(null);

  // ==============================
  // 스크롤
  // ==============================
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    // 현재 스크롤 영역 저장
    scrollRef.current = e.currentTarget;

    // 바닥에서 5px 이내면 끝으로 판단
    setIsBottom(scrollTop + clientHeight >= scrollHeight - 5);
  };

  // ==============================
  // 드래그 시작
  // ==============================
  const handlePointerDown = (e) => {
    const scrollElement = e.currentTarget;

    startY.current = e.clientY;
    startScrollTop.current = scrollElement.scrollTop;
    isDragging.current = true;
  };

  // ==============================
  // 드래그 이동
  // ==============================
  const handlePointerMove = (e) => {
    if (!isDragging.current || startY.current === null) return;

    const currentY = e.clientY;

    // 위로 이동하면 양수
    // 아래로 이동하면 음수
    const diff = startY.current - currentY;

    const scrollElement = e.currentTarget;

    // ========================================
    // 1. 닫힌 상태
    // ========================================
    // 위로 50px 이상 드래그하면 오픈
    // ========================================
    if (!isOpen) {
      if (diff > 50) {
        setIsOpen(true);

        startY.current = null;
        isDragging.current = false;
      }

      return;
    }

    // ========================================
    // 2. 열린 상태
    // ========================================
    // 콘텐츠가 맨 위에 있을 때만
    // 아래로 50px 이상 드래그하면 닫기
    // ========================================
    const isAtTop = scrollElement.scrollTop <= 0;

    if (isAtTop && diff < -50) {
      setIsOpen(false);

      startY.current = null;
      isDragging.current = false;
    }
  };

  // 드래그 종료
  const handlePointerUp = () => {
    startY.current = null;
    isDragging.current = false;
  };

  return (
    <div
      className={`
        absolute
        bottom-0
        left-0
        w-full
        flex
        flex-col
        rounded-t-[0.625rem]
        z-100
        bg-[#010101]
        px-[1.31rem]
        text-white
        transition-all
        duration-300
        ease-in-out
        ${
          isOpen
            ? "h-[calc(100vh-4.15rem)] sm:h-[calc(100vh-7.25rem)]"
            : "booth-detail-closed"
        }
      `}
    >
      {/* 헤더 */}
      <div className="shrink-0 w-full bg-[#010101]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-full
            h-[2rem]
            flex
            justify-center
            pt-[0.6rem]
          "
        >
          <div
            className="
              w-[4.375rem]
              h-[0.25rem]
              rounded-full
              bg-[#363636]
            "
          />
        </button>

        <Header booth={booth} />
      </div>

      {/* 내용 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          // 닫힌 상태 -> 위로 드래그해서 BottomSheet 열기
          // 열린 상태 -> 정상적인 세로 스크롤
          touchAction: isOpen ? "pan-y" : "none",
        }}
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
          cursor-grab
        "
      >
        <MainCard booth={booth} />

        <Links booth={booth} />

        <Content booth={booth} />

        {/* ==============================
            하단 그라데이션
        ============================== */}
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
