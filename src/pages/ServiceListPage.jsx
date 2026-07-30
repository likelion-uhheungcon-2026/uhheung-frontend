import { useState } from "react";
import SerchTab from "../features/ServiceList/components/SerchTab";
import ServiceList from "../features/ServiceList/components/ServiceList";
import { booths } from "../data/booths";

export default function ServiceListPage() {
  const [searchValue, setSearchValue] = useState("");

  const filteredBooths = booths.filter((booth) => {
    const keyword = searchValue.toLowerCase();

    return (
      booth.name.toLowerCase().includes(keyword) ||
      booth.team.toLowerCase().includes(keyword) ||
      booth.maincontent.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="h-screen flex flex-col text-white bg-[#141414]">
      {/* 고정 영역 */}
      <SerchTab searchValue={searchValue} setSearchValue={setSearchValue} />

      {/* 리스트만 스크롤 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-[1.31rem]">
        <ServiceList booths={filteredBooths} />
      </div>
    </div>
  );
}
