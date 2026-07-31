const options = ["멋사", "SJF", "AAC", "OPEN"];

export default function FilterBox({ selected, setSelected }) {
  const handleClick = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div
      className="
        flex items-center justify-center
        w-[12.75rem]
        h-[2.5rem]
        rounded-[0.625rem]
        bg-[rgba(54,54,54,0.20)]
        shadow-[0_4px_6px_0_rgba(0,0,0,0.40)]
        backdrop-blur-[2px]
      "
    >
      <div className="flex gap-[0.4rem]">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleClick(option)}
            className={`
              cursor-pointer
              h-[1.75rem]
              px-[0.6rem]
              rounded-[0.3125rem]
              bg-[#000]
              text-[0.75rem]
              ${selected.includes(option) ? "text-[#FF6000]" : "text-white"}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
