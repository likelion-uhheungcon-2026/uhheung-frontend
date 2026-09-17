import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleBack = () => {
    if (location.key === "default") {
      navigate("/home", { replace: true });
      return;
    }

    navigate(-1);
  };

  return (
    <div
      ref={tabRef}
      className="relative z-20 flex w-full shrink-0 justify-between px-[1.31rem] pt-[max(1rem,env(safe-area-inset-top))]"
    >
      <div className="mb-[0.56rem] flex w-full items-center">
        <button
          type="button"
          onClick={handleBack}
          aria-label="이전 페이지로 돌아가기"
          className="mr-[0.55rem] flex h-[2.5rem] w-[1.8rem] shrink-0 cursor-pointer items-center justify-start text-[#9A9A9A]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[1.7rem] w-[1.7rem]"
            fill="none"
          >
            <path
              d="M15 4 7 12l8 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 검색창 */}
        <div
          className="
            flex min-w-0 items-center
            flex-1
            gap-[0.5rem]
            h-[2.5rem]
            bg-[#050505]
            rounded-[0.3125rem]
            px-[0.75rem]
          "
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="출품작 검색"
            className="
              w-full
              bg-transparent
              outline-none
              text-[#d8d8d8]
              text-[1rem]
              placeholder:text-[#555555]
            "
          />

          <img
            src={search}
            alt=""
            aria-hidden="true"
            className="h-[1rem] w-[1rem] shrink-0"
          />
        </div>

        {/* 필터 */}
        <div
          onClick={handleFilterClick}
          className="relative ml-[0.7rem] h-[1.5rem] w-[1.5rem] shrink-0 cursor-pointer"
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
            />
          )}

          <img
            src={isFilterOpen ? filter : filterclick}
            className="relative z-10 w-[1.5rem] h-[1.5rem]"
          />
        </div>

        {/* 메뉴 */}
        <div
          onClick={handleMenuClick}
          className="relative ml-[0.7rem] h-[1.5rem] w-[1.5rem] shrink-0 cursor-pointer"
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
            />
          )}

          <img
            src={isMenuOpen ? menu : menuclick}
            className="relative z-10 w-[1.5rem] h-[1.5rem]"
          />
        </div>
      </div>

      {/* 필터 박스 */}
      {isFilterOpen && (
        <div
          className="
      absolute
      top-full
      right-[1.3rem]
      mt-[0.4rem]
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
      top-full
      right-[1.3rem]
      mt-[0.4rem]
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
