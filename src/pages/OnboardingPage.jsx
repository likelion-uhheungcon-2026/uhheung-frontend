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
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start">
        <img
          src={backgroundContent}
          alt="제3회 어흥콘 행사 안내"
          className="h-0 min-h-[40rem] flex-1 object-cover object-top"
        />

        <button
          type="button"
          onClick={handleClick}
          className="font-sbaggro mb-[max(3rem,env(safe-area-inset-bottom))]  flex h-[2.65rem] w-[calc(100%-6.25rem)] max-w-[18.875rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.4rem] bg-[#EF6B24] text-[1.05rem] font-normal text-white"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
