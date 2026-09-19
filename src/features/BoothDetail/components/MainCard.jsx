import { useMemo } from "react";
import { useCarousel } from "../../../hooks/useCarousel";

function getImageUrl(image) {
  if (typeof image === "string") return image;
  return image?.url ?? image?.src ?? image?.imageUrl ?? null;
}

function getBoothImages(booth) {
  const imageCollections = [
    booth.images,
    booth.serviceimages,
    booth.serviceImages,
    booth.imageUrls,
  ];

  const detailImages = imageCollections.find(
    (field) => Array.isArray(field) && field.length > 0,
  );

  const imageSource = detailImages ?? [booth.serviceimage];

  const images = imageSource.map(getImageUrl).filter(Boolean);

  if (Number(booth.id) === 3) {
    return images[1] ? [images[1]] : images.slice(0, 1);
  }

  return [...new Set(images)];
}

export default function MainCard({
  booth,
  variant = "sheet",
  isExpanded = false,
}) {
  const isPage = variant === "page";
  const usesFourThreeRatio = isPage || isExpanded;
  const images = useMemo(() => getBoothImages(booth), [booth]);
  const carousel = useCarousel({
    length: images.length,
    resetKey: `${booth.id}:${images.join("|")}`,
  });
  const hasMultipleImages = images.length > 1;

  return (
    <div
      data-carousel={hasMultipleImages ? "true" : undefined}
      {...(hasMultipleImages ? carousel.pointerHandlers : {})}
      style={{
        touchAction: hasMultipleImages ? "pan-y" : undefined,
      }}
      className={`relative isolate w-full shrink-0 rounded-[0.625rem] bg-black ${
        usesFourThreeRatio ? "aspect-[4/3]" : "h-[12.3125rem]"
      } ${hasMultipleImages ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[0.625rem] bg-black"
        style={{
          clipPath: "inset(0 round 0.625rem)",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${carousel.currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={image}
              className="h-full w-full shrink-0 overflow-hidden bg-black"
            >
              <img
                src={image}
                alt={`${booth.name} 서비스 화면 ${index + 1}`}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="block h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 아래쪽 어둡게 그라데이션 */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 41.3%, #000 100%)",
          }}
        />

        {hasMultipleImages && (
          <div className="absolute bottom-[0.25rem] left-1/2 z-20 flex -translate-x-1/2 items-center">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`${index + 1}번째 서비스 화면 보기`}
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
                      : "h-[0.25rem] w-[0.25rem] bg-[#8C8C8C]"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Figma의 Stroke Center처럼 카드 경계에 걸치는 전체 테두리 */}
      <div className="pointer-events-none absolute -inset-[0.1px] z-30 rounded-[calc(0.625rem+0.1px)] border-[0.2px] border-black" />
    </div>
  );
}
