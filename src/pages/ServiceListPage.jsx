import { useState } from "react";
import SerchTab from "../features/ServiceList/components/SerchTab";
import ServiceList from "../features/ServiceList/components/ServiceList";
import { byRecentViews, byViews, useBooths } from "../api/booths";

const SORTERS = {
  "이름 순": (a, b) => a.name.localeCompare(b.name, "ko") || a.id - b.id,
  "인기 순": byViews,
  "추천 순": byRecentViews,
};

export default function ServiceListPage() {
  const { booths, isLoading, error } = useBooths();
  const [searchValue, setSearchValue] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("추천 순");

  // 필터 상태 추가
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filteredBooths = booths.filter((booth) => {
    const keyword = searchValue.toLowerCase();

    const searchMatch =
      booth.name.toLowerCase().includes(keyword) ||
      booth.team.toLowerCase().includes(keyword) ||
      booth.maincontent.toLowerCase().includes(keyword);

    // 필터 선택 안 했으면 전체 표시
    const filterMatch =
      selectedFilters.length === 0 || selectedFilters.includes(booth.tag);

    return searchMatch && filterMatch;
  }).sort(SORTERS[selectedMenu]);

  return (
    //모바일 너비설정
    <div className="app-viewport flex w-full justify-center overflow-hidden">
      <div className=" flex h-full min-h-0 w-full flex-col bg-[#141414] text-white">
        {/* 고정 영역 */}
        <SerchTab
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        {/* 리스트만 스크롤 */}
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-[1.31rem] pb-[max(1rem,env(safe-area-inset-bottom))]">
          {isLoading || error ? (
            <p className="pt-[2rem] text-center text-[0.875rem] text-[#9A9A9A]">
              {error ? "부스 정보를 불러오지 못했습니다." : "불러오는 중..."}
            </p>
          ) : (
            <ServiceList booths={filteredBooths} />
          )}
        </div>
      </div>
    </div>
  );
}
