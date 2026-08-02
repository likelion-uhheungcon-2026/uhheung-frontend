import menudown from "../assets/menu-icon-down.svg";
import menudownclick from "../assets/menu-icon-down-click.svg";

const options = [
  { type: "text", value: "이름 순" },
  { type: "text", value: "인기 순" },
  { type: "text", value: "추천 순" },
  { type: "icon" },
];

export default function MenuBox({
  selected,
  setSelected,
  isDownOpen,
  setIsDownOpen,
}) {
  const handleClick = (option) => {
    if (option.type === "text") {
      // 항상 하나만 선택
      setSelected(option.value);
    } else {
      // 아이콘만 토글
      setIsDownOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="
        flex items-center justify-center
        w-[14.25rem]
        h-[2.5rem]
        rounded-[0.625rem]
        bg-[rgba(54,54,54,0.20)]
        shadow-[0_4px_6px_0_rgba(0,0,0,0.40)]
        backdrop-blur-[2px]
      "
    >
      <div className="flex gap-[0.4rem]">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            className={
              option.type === "icon"
                ? `
                  cursor-pointer
                  w-[1.75rem]
                  h-[1.75rem]
                  rounded-[0.3125rem]
                  bg-[#000]
                  flex items-center justify-center
                `
                : `
                  cursor-pointer
                  h-[1.75rem]
                  px-[0.6rem]
                  rounded-[0.3125rem]
                  bg-[#000]
                  flex items-center justify-center
                  text-[0.75rem]
                  transition-colors
                  ${selected === option.value ? "text-[#FF6000]" : "text-white"}
                `
            }
          >
            {option.type === "text" ? (
              option.value
            ) : (
              <img
                src={isDownOpen ? menudownclick : menudown}
                alt="메뉴"
                className="w-[1.5rem] h-[1.5rem]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
