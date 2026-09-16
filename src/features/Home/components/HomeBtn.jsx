export default function HomeBtn({ tab, setTab }) {
  return (
    <div className="flex shrink-0 justify-center text-sm font-normal text-white pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="relative flex h-[2.5rem] w-[11.25rem] rounded-[0.3125rem] bg-[#050505]">
        <div
          className={`absolute top-0 h-full w-1/2 rounded-[0.3125rem] bg-[#212121] transition-all duration-300 ${
            tab === "booth" ? "left-0" : "left-1/2"
          }`}
        />

        <button
          onClick={() => setTab("booth")}
          className={`relative z-10 flex w-1/2 cursor-pointer items-center justify-center transition-colors duration-300 ${
            tab === "booth" ? "text-[#FF6000]" : "text-white"
          }`}
        >
          부스 맵
        </button>

        <button
          onClick={() => setTab("time")}
          className={`relative z-10 flex w-1/2 cursor-pointer items-center justify-center transition-colors duration-300 ${
            tab === "time" ? "text-[#FF6000]" : "text-white"
          }`}
        >
          시간표
        </button>
      </div>
    </div>
  );
}
