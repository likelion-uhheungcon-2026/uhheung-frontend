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
        w-[13.3rem]
        h-[2.5rem]
        rounded-[0.625rem]
        shadow-[0_4px_6px_0_rgba(0,0,0,0.40)]
  bg-[rgba(0,0,0,0.60)]
  backdrop-blur-[15px]
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
