export default function ServiceListItem({ booth }) {
  return (
    <div
      className="
        relative
        w-[11rem]
        h-[13.25rem]
        rounded-[0.625rem]
        overflow-hidden
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
          bottom-0
          left-0
          w-full
          px-[1.1rem]
          pb-[1.1rem]
          text-white
        "
      >
        {/* 서비스명 + 팀명 */}
        <div className="flex items-center gap-[0.5rem]">
          <div className="text-[0.9375rem] font-semibold">{booth.name}</div>

          <div className="text-[0.75rem] font-medium">&lt;{booth.team}&gt;</div>
        </div>

        {/* 한줄소개 */}
        <div className="text-[0.6875rem] font-medium mt-[0.25rem]">
          {booth.maincontent}
        </div>
      </div>
    </div>
  );
}
