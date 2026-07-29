export default function RecommendedBooth({ isOpen, setIsOpen }) {
  return (
    <div
      className={`
        absolute bottom-0 left-0 w-full
        flex flex-col justify-start items-center
        h-screen
        rounded-t-[0.625rem]
        z-100
        bg-[#010101]
        px-[1.31rem]
        text-white
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "translate-y-[calc(100%-26rem)]"}
      `}
    >
      {/* 핸들 영역 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[2rem] flex justify-center pt-[0.6rem]"
      >
        <div className="w-[4.375rem] h-[0.25rem] rounded-full bg-[#363636]" />
      </button>
    </div>
  );
}
