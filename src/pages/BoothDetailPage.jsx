import { useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Content from "../features/BoothDetail/components/Content";
import Links from "../features/BoothDetail/components/Links";
import MainCard from "../features/BoothDetail/components/MainCard";
import { useBoothDetail } from "../api/booths";
import { useBoothView } from "../api/views";

export default function BoothDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { boothId } = useParams();
  const [isRefactoringReport, setIsRefactoringReport] = useState(false);
  const viewedBoothId = Number(boothId);
  const { booth, isLoading, error } = useBoothDetail(viewedBoothId);

  useBoothView(viewedBoothId, Boolean(booth));

  if (isLoading || error) {
    return (
      <div className="app-viewport flex items-center justify-center bg-[#0B0B0B] text-[0.875rem] text-[#9A9A9A]">
        {error ? "부스 정보를 불러오지 못했습니다." : "불러오는 중..."}
      </div>
    );
  }

  if (!booth) {
    return <Navigate to="/servicelist" replace />;
  }

  const handleBack = () => {
    if (location.key === "default") {
      navigate("/servicelist", { replace: true });
      return;
    }

    navigate(-1);
  };

  return (
    <div className="app-viewport flex min-h-0 flex-col overflow-hidden bg-[#0B0B0B] px-[1.31rem] pt-[1rem] text-white">
      <header className="relative flex h-[3.75rem] shrink-0 items-start justify-between pb-[0.75rem]">
        <button
          type="button"
          onClick={handleBack}
          aria-label="이전 페이지로 돌아가기"
          className="flex h-[2.5rem] w-[2.5rem] cursor-pointer  justify-start text-[#9A9A9A]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-[1.8rem] w-[1.8rem]"
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

        <div className="font-sbaggro absolute  left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap">
          <span className="text-[0.72rem] font-light leading-tight">
            {booth.team}
          </span>
          <h1 className="text-[1.45rem] font-normal leading-tight">
            {booth.name}
          </h1>
        </div>

        <div className="font-bold pt-[0.02rem] flex h-[2.5rem] text-[1.25rem] text-[#949494]">
          {booth.id}번
        </div>
      </header>

      <main className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-contain bg-black pb-[max(2rem,env(safe-area-inset-bottom))]">
        <MainCard booth={booth} variant="page" />

        <Links
          booth={booth}
          isRefactoringReport={isRefactoringReport}
          setIsRefactoringReport={setIsRefactoringReport}
        />

        <Content booth={booth} isRefactoringReport={isRefactoringReport} />
      </main>
    </div>
  );
}
