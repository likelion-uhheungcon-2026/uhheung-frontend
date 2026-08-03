import bg from "../assets/timeline-bg.svg";

export default function TimeLine({ time, destination }) {
  return (
    <div className="relative w-[22.5rem] h-auto mb-[0.3rem]">
      <img src={bg} className="w-[22.5rem] block" />

      <div className="absolute inset-0 flex items-center px-[0.28rem] text-[#CACACA] text-[0.9375rem] flex-row">
        <div className="flex flex-row">
          <div className="text-[1rem] tracking-[0.43rem]">
            {time.slice(0, 2)}
          </div>

          <div className="text-[1rem] ml-[0.07rem]">:</div>

          <div className="text-[1rem] ml-[0.49rem] tracking-[0.27rem]">
            {time.slice(2)}
          </div>
        </div>

        <div className="ml-[0.9rem] tracking-[0.065rem]">{destination}</div>
      </div>
    </div>
  );
}
