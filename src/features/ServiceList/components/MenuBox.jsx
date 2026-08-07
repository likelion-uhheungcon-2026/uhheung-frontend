const options = [
  { value: "이름 순" },
  { value: "인기 순" },
  { value: "추천 순" },
];

export default function MenuBox({ selected, setSelected }) {
  const handleClick = (option) => {
    setSelected(option.value);
  };

  return (
    <div
      className="
        flex items-center justify-center
        w-[12.25rem]
        h-[2.5rem]
        rounded-[0.625rem]
          bg-[rgba(0,0,0,0.60)]
  backdrop-blur-[15px]
        shadow-[0_4px_6px_0_rgba(0,0,0,0.40)]
  
      "
    >
      <div className="flex gap-[0.4rem]">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleClick(option)}
            className={`
              cursor-pointer
              h-[1.75rem]
              px-[0.6rem]
              rounded-[0.3125rem]
              bg-[#000]
              flex items-center justify-center
              text-[0.75rem]
              transition-colors
              ${selected === option.value ? "text-[#FF6000]" : "text-white"}
            `}
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
}
