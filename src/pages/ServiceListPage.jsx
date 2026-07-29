import SerchTab from "../features/ServiceList/components/SerchTab";
import ServiceList from "../features/ServiceList/components/ServiceList";
import { booths } from "../data/booths";

export default function ServiceListPage() {
  return (
    <div className="h-screen flex flex-col text-white">
      {/* 고정 영역 */}
      <SerchTab />

      {/* 리스트만 스크롤 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-[1.31rem]">
        <ServiceList />
      </div>
    </div>
  );
}
