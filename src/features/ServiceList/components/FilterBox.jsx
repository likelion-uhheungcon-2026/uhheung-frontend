const categoryOptions = ["CON", "WEL", "CAR", "EXP"];
const tagOptions = ["멋사", "SJF", "AAC", "OPEN"];

export default function FilterBox({
  selected,
  setSelected,
  selectedCategories,
  setSelectedCategories,
}) {
  const toggleOption = (option, setSelection) => {
    setSelection((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  };

  const renderOptions = (options, selection, setSelection) =>
    options.map((option) => {
      const isSelected = selection.includes(option);

      return (
        <button
          key={option}
          type="button"
          aria-pressed={isSelected}
          onClick={() => toggleOption(option, setSelection)}
          className={`
            h-[1.75rem]
            min-w-0
            flex-1
            cursor-pointer
            rounded-[0.3125rem]
            bg-[#000]
            px-[0.45rem]
            text-[0.75rem]
            ${isSelected ? "text-[#FF6000]" : "text-white"}
          `}
        >
          {option}
        </button>
      );
    });

  return (
    <div
      className="
        flex flex-col items-center justify-center gap-[0.35rem]
        w-[13.3rem]
        h-[4.85rem]
        px-[0.55rem]
        rounded-[0.625rem]
        shadow-[0_4px_6px_0_rgba(0,0,0,0.40)]
        bg-[rgba(0,0,0,0.60)]
        backdrop-blur-[15px]
      "
    >
      <div className="flex w-full gap-[0.35rem]">
        {renderOptions(
          categoryOptions,
          selectedCategories,
          setSelectedCategories,
        )}
      </div>

      <div className="flex w-full gap-[0.35rem]">
        {renderOptions(tagOptions, selected, setSelected)}
      </div>
    </div>
  );
}
