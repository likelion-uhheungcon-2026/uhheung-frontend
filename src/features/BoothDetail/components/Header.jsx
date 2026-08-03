import { Link } from "react-router-dom";

export default function Header({ booth }) {
  return (
    <div className="relative flex justify-between items-center w-full">
      <div className="text-[#949494] text-[1rem] font-bold">{booth.id}번</div>

      <div className="font-sbaggro absolute left-1/2 -translate-x-1/2 text-[1rem] font-bold">
        {booth.name}
      </div>

      <Link
        to="/servicelist"
        className=" text-[0.75rem] font-extralight text-[#FF6000]"
      >
        출품작 목록 →
      </Link>
    </div>
  );
}
