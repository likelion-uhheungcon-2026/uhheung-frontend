import bg from "../assets/timeline-bg.svg";

export default function TimeLine({ time, destination }) {
  return (
    <div className="relative w-[22.5rem] h-auto mb-[0.3rem]">
      <img src={bg} className="w-[22.5rem] block" />

      <div className="absolute inset-0 flex items-center px-[0.22rem] text-[#CACACA] text-[0.9375rem] flex-row">
        <div className="flex flex-row">
          <div className="text-[1rem] tracking-[0.4rem]">
            {time.slice(0, 2)}
          </div>

          <div className="text-[1rem] ml-[0.18rem]">:</div>

          <div className="text-[1rem] ml-[0.55rem] tracking-[0.4rem]">
            {time.slice(2)}
          </div>
        </div>

        <div className="ml-[0.77rem] tracking-[0.07rem]">{destination}</div>
      </div>
    </div>
  );
}
