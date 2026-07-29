import search from "../assets/search-icon.svg";
import filter from "../assets/filter-icon.svg";
import menu from "../assets/menu-icon.svg";

export default function SerchTab({ searchValue, setSearchValue }) {
  return (
    <div className="relative mt-[4.12rem]">
      <div className="flex flex-row justify-between items-center px-[1.31rem]">
        <div
          className="
          px-[0.58rem]
          flex flex-row
          gap-[0.44rem]
          justify-start
          items-center
          w-[17.5rem]
          h-[2.5rem]
          bg-[#050505]
          rounded-[0.3125rem]
        "
        >
          <img src={search} className="w-[1rem] h-[1rem]" />

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="출품작 검색"
            className="
              w-full
              bg-transparent
              outline-none
              text-[#d8d8d8]
              text-[0.875rem]
              placeholder:text-[#d8d8d8]
            "
          />
        </div>

        <img src={filter} className="cursor-pointer w-[1.5rem] h-[1.5rem]" />

        <img src={menu} className="cursor-pointer w-[1.5rem] h-[1.5rem]" />
      </div>

      {/* 아래쪽 그라데이션 */}
      <div
        className="
          absolute
          top-full
          left-0
          w-full
          z-100
          h-[2.5rem]
          pointer-events-none
          bg-[linear-gradient(180deg,#141414_0%,rgba(20,20,20,0)_100%)]
        "
      />
    </div>
  );
}
