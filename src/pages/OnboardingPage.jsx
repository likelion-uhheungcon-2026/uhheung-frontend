import { useNavigate } from "react-router-dom";

import backgroundImage from "../features/Onboarding/assets/bg-img.svg";
import backgroundContent from "../features/Onboarding/assets/bg-content.svg";

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("visited", "true");
    navigate("/home", { replace: true });
  };

  return (
    <div className="app-viewport relative w-full overflow-hidden bg-black">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center pt-[env(safe-area-inset-top)] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <img
          src={backgroundContent}
          alt="제3회 어흥콘 행사 안내"
          className="min-h-0 w-full flex-1 object-contain object-top"
        />

        <button
          type="button"
          onClick={handleClick}
          className="font-sbaggro mt-[clamp(0.75rem,2.5dvh,1.5rem)] mb-[clamp(0rem,3dvh,2rem)] flex h-[2.65rem] w-[calc(100%-6.25rem)] max-w-[18.875rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.4rem] bg-[#EF6B24] text-[1.05rem] font-normal text-white"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
