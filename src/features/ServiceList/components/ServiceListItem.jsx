import { useNavigate } from "react-router-dom";

export default function ServiceListItem({ booth }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home", {
      state: {
        boothId: booth.id,
      },
    });
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
        cursor-pointer
      "
    >
      <img
        src={booth.serviceimage}
        alt={booth.name}
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
          inset-0
          bg-[linear-gradient(180deg,rgba(0,0,0,0)_30.29%,rgba(0,0,0,0.86)_79.81%,#000_100%)]
        "
      />

      <div
        className="
          absolute
          top-[0.9rem]
          left-[0.7rem]
        "
      >
        <div
          className="
            px-[0.5rem]
            h-[1.5rem]
            rounded-[0.3125rem]
            bg-[rgba(0,0,0,0.8)]
            flex
            justify-center
            items-center
            text-[clamp(0.625rem,2vw,0.75rem)]
            tracking-[0.04rem]
            text-[#FF6000]
            whitespace-nowrap
          "
        >
          {booth.tag}
        </div>
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
        <div className="flex items-center gap-[0.35rem] flex-wrap">
          <div className="text-[clamp(0.8rem,2.5vw,0.9375rem)] font-semibold">
            {booth.name}
          </div>

          <div className="text-[clamp(0.625rem,2vw,0.75rem)] font-medium">
            &lt;{booth.team}&gt;
          </div>
        </div>

        <div className="mt-[0.2rem] text-[clamp(0.6rem,1.8vw,0.6875rem)] font-medium line-clamp-2">
          "{booth.maincontent}"
        </div>
      </div>
    </div>
  );
}
