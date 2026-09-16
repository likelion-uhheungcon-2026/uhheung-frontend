import { useRef, useState } from "react";

import Header from "./Header";
import Links from "./Links";
import MainCard from "./MainCard";
import Content from "./Content";

export default function BoothDetail({ booth, sheetStage, setSheetStage }) {
  const [isBottom, setIsBottom] = useState(false);
  const [isRefactoringReport, setIsRefactoringReport] = useState(false);

  // 드래그 시작 위치
  const startY = useRef(null);

  // 드래그 시작 당시의 스크롤 위치
  const startScrollTop = useRef(0);

  // 드래그 중인지 확인
  const isDragging = useRef(false);

  // 핸들 드래그 뒤 click 이벤트가 다시 상태를 바꾸는 것을 방지
  const didDrag = useRef(false);

  // 클릭으로 단계를 바꿀 때 펼침/접힘 방향 유지
  const clickDirection = useRef(1);

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
    didDrag.current = false;

    if (scrollElement.tagName === "BUTTON") {
      scrollElement.setPointerCapture(e.pointerId);
    }
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

    const isHandle = scrollElement.tagName === "BUTTON";
    const isAtTop = scrollElement.scrollTop <= 0;

    if (isHandle && diff > 50 && sheetStage < 2) {
      didDrag.current = true;
      clickDirection.current = 1;
      setSheetStage((prev) => Math.min(2, prev + 1));

      startY.current = null;
      isDragging.current = false;
      return;
    }

    if ((isHandle || isAtTop) && diff < -50 && sheetStage > 0) {
      didDrag.current = true;
      clickDirection.current = -1;
      setSheetStage((prev) => Math.max(0, prev - 1));

      startY.current = null;
      isDragging.current = false;
    }
  };

  // 드래그 종료
  const handlePointerUp = () => {
    startY.current = null;
    isDragging.current = false;
  };

  const handleStageClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    setSheetStage((prev) => {
      if (prev === 0) clickDirection.current = 1;
      if (prev === 2) clickDirection.current = -1;

      return prev + clickDirection.current;
    });
  };

  const sheetHeightClass =
    sheetStage === 2
      ? "sheet-stage-expanded"
      : sheetStage === 1
        ? "sheet-stage-middle"
        : "sheet-stage-collapsed";

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
        ${sheetHeightClass}
      `}
    >
      {/* 헤더 */}
      <div className="shrink-0 h-[4.7rem] w-full bg-[#010101]">
        <button
          type="button"
          onClick={handleStageClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: "none" }}
          aria-label={`상세 정보 패널: ${sheetStage + 1}단계`}
          className="
            w-full
            h-[2rem]
            flex
            justify-center
            pt-[0.6rem]
            cursor-grab
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
          touchAction: sheetStage > 0 ? "pan-y" : "none",
        }}
        className={`
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
          ${sheetStage > 0 ? "visible" : "invisible"}
        `}
      >
        <MainCard booth={booth} />

        <Links
          booth={booth}
          isRefactoringReport={isRefactoringReport}
          setIsRefactoringReport={setIsRefactoringReport}
        />

        <Content booth={booth} isRefactoringReport={isRefactoringReport} />

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
