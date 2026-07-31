import { useNavigate } from "react-router-dom";

export default function ServiceListItem({ booth }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", {
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
        max-w-[11rem]
        aspect-[11/13.25]
        rounded-[0.625rem]
        overflow-hidden
        cursor-pointer
      "
    >
      <img
        src={booth.serviceimage}
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
          top-[1.1rem]
          left-[0.75rem]
        "
      >
        <div
          className="
            w-[2.8rem]
            h-[1.5rem]
            rounded-[0.3125rem]
            bg-[rgba(0,0,0,0.8)]
            flex
            justify-center
            items-center
            text-[0.75rem]
            text-[#FF6000]
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
          px-[1.1rem]
          pb-[1.1rem]
          text-white
        "
      >
        <div className="flex items-center gap-[0.5rem]">
          <div className="text-[0.9375rem] font-semibold">{booth.name}</div>

          <div className="text-[0.75rem] font-medium">&lt;{booth.team}&gt;</div>
        </div>

        <div className="text-[0.6875rem] font-medium mt-[0.25rem]">
          "{booth.maincontent}"
        </div>
      </div>
    </div>
  );
}
