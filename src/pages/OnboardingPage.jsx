import logo from "../features/Onboarding/assets/logo.png";
import lionlogo from "../features/Onboarding/assets/lion-logo.svg";
import { useNavigate } from "react-router-dom";
export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-between items-center py-[5rem]">
      <div className="w-full mt-[4.53rem] sm:mt-[7.63rem] gap-[0.81rem] flex flex-col items-center">
        <img src={logo} className="w-[15.5625rem] h-[5.9375rem]" />
        <img src={lionlogo} className="w-[12rem]" />
      </div>

      <div
        onClick={handleClick}
        className="font-sbaggro text-[1rem] flex justify-center items-center bg-[#050505] w-[11.25rem] h-[2.5rem] rounded-[0.3125rem] cursor-pointer text-[#FF6000]"
      >
        시작하기
      </div>
    </div>
  );
}
