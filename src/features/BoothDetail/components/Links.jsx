import orange from "../assets/link-orange.svg";
import white from "../assets/link-white.svg";

export default function Links() {
  return (
    <div className="w-full mt-[0.31rem] flex justify-between items-center">
      <div className="rounded-[0.625rem] bg-[#141414] cursor-pointer items-center justify-center w-[10.9375rem] h-[1.875rem]  flex flex-row gap-[0.3rem] ">
        <img src={orange} className="w-[1.5rem] h-[1.5rem]" />
        <button className="text-[#FF6000] text-[0.875rem]  ">
          서비스 링크
        </button>
      </div>
      <div className="rounded-[0.625rem] bg-[#141414] cursor-pointer items-center justify-center w-[10.9375rem] h-[1.875rem]  flex flex-row gap-[0.3rem] ">
        <img src={white} className="w-[1.5rem] h-[1.5rem]" />
        <button className=" text-[0.875rem] ">프로젝트 링크</button>
      </div>
    </div>
  );
}
