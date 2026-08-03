import { useState } from "react";
import SerchTab from "../features/ServiceList/components/SerchTab";
import ServiceList from "../features/ServiceList/components/ServiceList";
import { booths } from "../data/booths";

export default function ServiceListPage() {
  const [searchValue, setSearchValue] = useState("");

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
  });

  return (
    <div className="pt-[env(safe-area-inset-top)] h-screen flex flex-col text-white bg-[#141414]">
      {/* 고정 영역 */}
      <SerchTab
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />

      {/* 리스트만 스크롤 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-[1.31rem]">
        <ServiceList booths={filteredBooths} />
      </div>
    </div>
  );
}
