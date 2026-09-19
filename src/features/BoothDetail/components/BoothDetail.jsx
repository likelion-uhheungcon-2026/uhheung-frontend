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
  const startX = useRef(null);
  const startedInCarousel = useRef(false);

  // 드래그 중인지 확인
  const isDragging = useRef(false);

  // 핸들 드래그 뒤 click 이벤트가 다시 상태를 바꾸는 것을 방지
  const didDrag = useRef(false);

  // 중간 단계에서 다음 클릭이 향할 방향 (1: 위, -1: 아래)
  const [stageDirection, setStageDirection] = useState(1);

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
    const isHandle = scrollElement.tagName === "BUTTON";
    const isInteractiveContent = Boolean(
      e.target.closest(
        'button, a, input, textarea, select, [role="button"], [role="menuitem"], [data-carousel]',
      ),
    );

    startY.current = e.clientY;
    startX.current = e.clientX;
    startedInCarousel.current = Boolean(e.target.closest("[data-carousel]"));
    isDragging.current = true;
    didDrag.current = false;

    if (isHandle || (sheetStage < 2 && !isInteractiveContent)) {
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
    const diffX = startX.current - e.clientX;

    if (startedInCarousel.current && Math.abs(diffX) > Math.abs(diff)) {
      return;
    }

    const scrollElement = e.currentTarget;

    const isHandle = scrollElement.tagName === "BUTTON";
    const isAtTop = scrollElement.scrollTop <= 0;

    if (diff > 50 && sheetStage < 2) {
      didDrag.current = true;
      setStageDirection(1);
      setSheetStage(sheetStage + 1);

      startY.current = null;
      isDragging.current = false;
      return;
    }

    const canDragDown = sheetStage === 1 || isHandle || isAtTop;

    if (canDragDown && diff < -50 && sheetStage > 0) {
      didDrag.current = true;
      setStageDirection(-1);
      setSheetStage(sheetStage - 1);

      startY.current = null;
      isDragging.current = false;
    }
  };

  // 드래그 종료
  const handlePointerUp = () => {
    startY.current = null;
    startX.current = null;
    startedInCarousel.current = false;
    isDragging.current = false;
  };

  const handleStageClick = () => {
    if (didDrag.current) {
      didDrag.current = false;
      return;
    }

    setSheetStage((prev) => {
      if (prev === 0) {
        setStageDirection(1);
        return 1;
      }

      if (prev === 2) {
        setStageDirection(-1);
        return 1;
      }

      return prev + stageDirection;
    });
  };

  const sheetHeightClass =
    sheetStage === 2
      ? "sheet-stage-expanded"
      : sheetStage === 1
        ? "sheet-stage-middle"
        : "sheet-stage-collapsed";

  const sheetStageLabel =
    sheetStage === 2 ? "전체" : sheetStage === 1 ? "중간" : "접힘";

  const sheetMotionClass =
    sheetStage === 1 && stageDirection === 1
      ? "sheet-slide-up"
      : "";

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
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${sheetHeightClass}
        ${sheetMotionClass}
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
          aria-label={`상세 정보 패널: ${sheetStageLabel} 단계`}
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
          // 중간 단계에서는 어느 위치에서든 위로 드래그해 패널을 연다.
          // 전체 단계에서만 본문 스크롤을 허용한다.
          touchAction: sheetStage === 2 ? "pan-y" : "none",
        }}
        className={`
          relative
          flex-1
          min-h-0
          w-full
          bg-black
          overflow-y-auto
          overflow-x-hidden
          scrollbar-hide
          overscroll-contain
          pb-[env(safe-area-inset-bottom)]
          mt-[0.5rem]
          cursor-grab
        `}
      >
        <MainCard booth={booth} isExpanded={sheetStage === 2} />

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
