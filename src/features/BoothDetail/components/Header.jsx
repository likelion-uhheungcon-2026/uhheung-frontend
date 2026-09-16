import { Link } from "react-router-dom";

export default function Header({ booth }) {
  return (
    <div className="relative  flex justify-between items-start w-full">
      <div className=" text-[#949494] text-[1rem] font-bold">{booth.id}번</div>

      <div className="flex flex-col items-center font-sbaggro absolute left-1/2 -translate-x-1/2 text-[1rem] font-bold">
        <div className="font-light text-[0.7rem]">{booth.team}</div>
        <div>{booth.name}</div>
      </div>

      <Link
        to="/servicelist"
        className=" text-[0.875rem] font-extralight text-[#FF6000]"
      >
        출품작 목록 →
      </Link>
    </div>
  );
}
