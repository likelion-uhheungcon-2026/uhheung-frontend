import { useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 45;

export function useCarousel({ length, resetKey, intervalMs = 3000 }) {
  const [slide, setSlide] = useState({ resetKey, index: 0 });
  const [interactionVersion, setInteractionVersion] = useState(0);
  const startPoint = useRef(null);
  const didSwipe = useRef(false);

  const currentIndex =
    length === 0 || slide.resetKey !== resetKey
      ? 0
      : slide.index % length;

  const selectIndex = (index) => {
    if (length === 0) return;

    setSlide({
      resetKey,
      index: (index + length) % length,
    });
    setInteractionVersion((version) => version + 1);
  };

  useEffect(() => {
    if (length <= 1) return;

    const interval = setInterval(() => {
      setSlide((previous) => {
        const previousIndex =
          previous.resetKey === resetKey ? previous.index : 0;

        return {
          resetKey,
          index: (previousIndex + 1) % length,
        };
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [interactionVersion, intervalMs, length, resetKey]);

  const handlePointerDown = (event) => {
    startPoint.current = { x: event.clientX, y: event.clientY };
    didSwipe.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!startPoint.current || length <= 1) return;

    const distanceX = event.clientX - startPoint.current.x;
    const distanceY = event.clientY - startPoint.current.y;

    if (
      Math.abs(distanceX) < SWIPE_THRESHOLD ||
      Math.abs(distanceX) <= Math.abs(distanceY)
    ) {
      return;
    }

    didSwipe.current = true;
    selectIndex(currentIndex + (distanceX < 0 ? 1 : -1));
    startPoint.current = null;
  };

  const handlePointerEnd = () => {
    startPoint.current = null;
  };

  const consumeSwipe = () => {
    if (!didSwipe.current) return false;
    didSwipe.current = false;
    return true;
  };

  return {
    currentIndex,
    selectIndex,
    consumeSwipe,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
}
