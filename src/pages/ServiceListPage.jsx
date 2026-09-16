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
    //모바일 너비설정
    <div className="app-viewport flex w-full justify-center overflow-hidden">
      <div className="flex h-full min-h-0 w-full flex-col bg-[#141414] text-white">
        {/* 고정 영역 */}
        <SerchTab
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        {/* 리스트만 스크롤 */}
        <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-[1.31rem] pb-[max(1rem,env(safe-area-inset-bottom))]">
          <ServiceList booths={filteredBooths} />
        </div>
      </div>
    </div>
  );
}
