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
        overflow-hidden
        cursor-pointer
        border-box
      "
    >
      <img
        src={booth.serviceimage}
        alt=""
        loading="lazy"
        decoding="async"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      <div
        className="
          absolute
    left-0
    right-0
    -bottom-[0.1rem]
    top-0
          bg-[linear-gradient(180deg,rgba(20,20,20,0)_50%,#141414_100%)]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          flex
          px-[1.1rem]
          pb-[clamp(0.4rem,1.4vh,0.7rem)]
          text-white
        "
      >
        <div className="text-[1rem] font-sbaggro font-normal">{title}</div>
      </div>
    </button>
  );
}
