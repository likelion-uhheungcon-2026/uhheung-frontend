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

  const images = imageSource
    .map(getImageUrl)
    .filter(Boolean);

  return [...new Set(images)];
}

export default function MainCard({ booth, variant = "sheet" }) {
  const isPage = variant === "page";
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
      style={{ touchAction: hasMultipleImages ? "pan-y" : undefined }}
      className={`relative w-full overflow-hidden ${
        isPage
          ? "h-[15rem] rounded-[0.625rem]"
          : "h-[12.3125rem] rounded-t-[0.625rem]"
      } ${hasMultipleImages ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${carousel.currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`${booth.name} 서비스 화면 ${index + 1}`}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="h-full w-full shrink-0 object-cover"
          />
        ))}
      </div>

      {/* 아래쪽 어둡게 그라데이션 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_41.3%,#000_100%)]" />

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
  );
}
