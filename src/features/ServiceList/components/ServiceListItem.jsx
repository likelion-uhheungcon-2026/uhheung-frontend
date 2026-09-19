import { useNavigate } from "react-router-dom";

export default function ServiceListItem({
  booth,
  isTagSelected,
  isCategorySelected,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booth/${booth.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        relative
        w-full
        aspect-[11/13.25]
        rounded-[0.625rem]
        overflow-hidden
        bg-black
        isolate
        cursor-pointer
      "
    >
      <img
        src={booth.serviceimage}
        alt={booth.name}
        loading="lazy"
        decoding="async"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          scale-[1.01]
        "
      />

      <div
        className="
          absolute
          -left-[0.35rem]
          -right-[0.35rem]
          top-[0.15rem]
          -bottom-[0.35rem]
          pointer-events-none
          bg-[linear-gradient(180deg,rgba(0,0,0,0)_30.29%,rgba(0,0,0,0.86)_79.81%,#000_100%)]
        "
      />

      <div
        className="
          absolute
          top-[0.9rem]
          left-[0.7rem]
          flex
          gap-[0.35rem]
        "
      >
        {booth.category && (
          <div
            className={`flex h-[1.5rem] items-center justify-center whitespace-nowrap rounded-[0.3125rem] bg-[rgba(0,0,0,0.8)] px-[0.5rem] text-[clamp(0.625rem,2vw,0.75rem)] tracking-[0.04rem] ${
              isCategorySelected ? "text-[#FF6000]" : "text-white"
            }`}
          >
            {booth.category}
          </div>
        )}

        {booth.tag && (
          <div
            className={`flex h-[1.5rem] items-center justify-center whitespace-nowrap rounded-[0.3125rem] bg-[rgba(0,0,0,0.8)] px-[0.5rem] text-[clamp(0.625rem,2vw,0.75rem)] tracking-[0.04rem] ${
              isTagSelected ? "text-[#FF6000]" : "text-white"
            }`}
          >
            {booth.tag}
          </div>
        )}
      </div>

      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          px-[0.9rem]
          pb-[0.9rem]
          text-white
        "
      >
        <div className="flex flex-col items-start gap-[0.05rem]">
          <div className="text-[clamp(0.8rem,2.5vw,0.9375rem)] font-semibold leading-tight">
            {booth.name}
          </div>

          <div className="text-[clamp(0.625rem,2vw,0.75rem)] font-medium leading-tight">
            &lt;{booth.team}&gt;
          </div>
        </div>

        <div className="mt-[0.2rem] text-[clamp(0.6rem,1.8vw,0.6875rem)] font-medium line-clamp-2">
          {booth.maincontent}
        </div>
      </div>
    </div>
  );
}
