import { useState, useEffect, useRef } from "react";

import search from "../assets/search-icon.svg";
import filter from "../assets/filter-icon.svg";
import filterclick from "../assets/filter-icon-click.svg";
import menu from "../assets/menu-icon.svg";
import menuclick from "../assets/menu-icon-click.svg";

import FilterBox from "./FilterBox";
import MenuBox from "./MenuBox";

export default function SerchTab({
  searchValue,
  setSearchValue,
  selectedFilters,
  setSelectedFilters,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 기본값: 추천 순
  const [selectedMenu, setSelectedMenu] = useState("추천 순");

  // 메뉴 안의 아래 화살표 상태
  const [isDownOpen, setIsDownOpen] = useState(false);

  const tabRef = useRef(null);

  // 바깥 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (tabRef.current && !tabRef.current.contains(e.target)) {
        setIsFilterOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
    setIsMenuOpen(false);
  };

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
    setIsFilterOpen(false);
  };

  return (
    <div ref={tabRef} className="relative mt-[1rem] z-20">
      <div className="mb-[0.56rem] flex justify-between items-center px-[1.31rem]">
        {/* 검색창 */}
        <div
          className="
            px-[0.58rem]
            flex items-center
            gap-[0.44rem]
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

        {/* 필터 */}
        <div
          onClick={handleFilterClick}
          className="relative w-[1.5rem] h-[1.5rem] cursor-pointer"
        >
          {isFilterOpen && (
            <div
              className="
                absolute
                top-1/2
                left-1/2
                w-[2.5rem]
                h-[2.5rem]
                rounded-full
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,.2) 0%, rgba(255,255,255,.06) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
          )}

          <img
            src={isFilterOpen ? filterclick : filter}
            className="relative z-10 w-[1.5rem] h-[1.5rem]"
          />
        </div>

        {/* 메뉴 */}
        <div
          onClick={handleMenuClick}
          className="relative w-[1.5rem] h-[1.5rem] cursor-pointer"
        >
          {isMenuOpen && (
            <div
              className="
                absolute
                top-1/2
                left-1/2
                w-[2.5rem]
                h-[2.5rem]
                rounded-full
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,.2) 0%, rgba(255,255,255,.06) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
          )}

          <img
            src={isMenuOpen ? menuclick : menu}
            className="relative z-10 w-[1.5rem] h-[1.5rem]"
          />
        </div>
      </div>

      {/* 필터 박스 */}
      {isFilterOpen && (
        <div
          className="
            absolute
            left-[9.674rem]
            top-full
            w-full
            px-[1.31rem]
            z-30
          "
        >
          <FilterBox
            selected={selectedFilters}
            setSelected={setSelectedFilters}
          />
        </div>
      )}

      {/* 메뉴 박스 */}
      {isMenuOpen && (
        <div
          className="
            absolute
            left-[8.174rem]
            top-full
            w-full
            px-[1.31rem]
            z-30
          "
        >
          <MenuBox
            selected={selectedMenu}
            setSelected={setSelectedMenu}
            isDownOpen={isDownOpen}
            setIsDownOpen={setIsDownOpen}
          />
        </div>
      )}
    </div>
  );
}
