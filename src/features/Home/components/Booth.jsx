export default function Booth({
  booth,
  backgroundColor,
  overlayColor,
  selectedBoothId,
  setSelectedBoothId,
}) {
  const isSelected = selectedBoothId === booth.id;

  return (
    <button
      type="button"
      onClick={() => setSelectedBoothId(isSelected ? null : booth.id)}
      aria-pressed={isSelected}
      aria-label={`${booth.id}번 ${booth.team} ${booth.name}${
        isSelected ? " 선택 해제" : " 선택"
      }`}
      style={{
        backgroundColor,
        backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor})`,
      }}
      className={`
        font-sbaggro flex h-[3rem] w-[2.7rem] min-w-0 cursor-pointer
        flex-col items-center justify-center overflow-hidden rounded-[0.32rem]
        border-2  text-center transition-colors duration-200
        ${
          isSelected
            ? "border-[#E16A2D]"
            : "border-transparent"
        }
      `}
    >
      <span
        className={`text-[1rem] font-light leading-none ${
          isSelected ? "text-[#E16A2D]" : "text-white"
        }`}
      >
        {booth.id}
      </span>

      <span
        className={`px-[0.2rem] w-full truncate text-[clamp(0.28rem,1.25vw,0.34rem)] font-light leading-tight ${
          isSelected ? "text-[#E16A2D]" : "text-white"
        }`}
      >
        {booth.team}
      </span>

      <span
        className={`mt-[0.1rem] w-full truncate text-[clamp(0.31rem,1.45vw,0.39rem)] font-medium leading-tight ${
          isSelected ? "text-[#E16A2D]" : "text-white"
        }`}
      >
        {booth.name}
      </span>
    </button>
  );
}
