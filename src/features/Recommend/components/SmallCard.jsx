export default function SmallCard({ title, booth, onBoothClick }) {
  if (!booth) return null;

  return (
    <button
      type="button"
      onClick={() => onBoothClick(booth.id)}
      aria-label={`${booth.name} 작품 상세 보기`}
      className="
        relative
        flex-1
        min-w-0
        h-full
        min-h-0
        rounded-[0.625rem]
        isolate
        bg-[#141414]
        cursor-pointer
        border-box
      "
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[0.625rem] bg-[#141414]"
        style={{
          clipPath: "inset(0 round 0.625rem)",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        <img
          src={booth.serviceimage}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0)_50%,#141414_100%)]" />

        <div className="absolute bottom-0 left-0 flex w-full px-[1.1rem] pb-[clamp(0.4rem,1.4vh,0.7rem)] text-white">
          <div className="font-sbaggro text-[1rem] font-normal">{title}</div>
        </div>
      </div>

      {/* Figma의 Stroke Center처럼 카드 경계에 걸치는 전체 테두리 */}
      <div className="pointer-events-none absolute -inset-[0.1px] z-30 rounded-[calc(0.625rem+0.1px)] border-[0.2px] border-black" />
    </button>
  );
}
