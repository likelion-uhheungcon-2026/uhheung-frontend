import icon from "../assets/terminal-icon.svg";
import timetable from "../assets/timetable.svg";
// import TimeLine from "./TimeLine";

export default function TimeTable() {
  // const schedule = [
  //   { time: "1200", destination: "개회식" },
  //   { time: "1230", destination: "부스준비" },
  //   { time: "1300", destination: "세미나진행" },
  //   { time: "1400", destination: "부스행사" },
  //   { time: "1630", destination: "부스정리" },
  //   { time: "1700", destination: "세미나진행" },
  //   { time: "1800", destination: "시상식및폐회식" },
  //   { time: "1900", destination: "비어파티" },
  // ];

  return (
    <div className="mt-[0.7rem] flex w-full flex-col items-center justify-center px-[1rem] text-white">
      <div className="flex w-full max-w-[22.5rem] flex-row items-center gap-[1rem] px-[1.4rem] text-[#FF6000]">
        <img src={icon} className="w-[1.8125rem]" />
        <div className="text-[1.5rem]">Events</div>
      </div>

      <div className="mt-[0.2rem] flex w-full max-w-[22.5rem] flex-row items-center gap-[3.3rem] text-[0.9375rem] text-[#FF6000]">
        <div>Time</div>
        <div>Destination</div>
      </div>

      <div className="mt-[0.2rem] w-full max-w-[22.5rem]">
        {/* {schedule.map((item, index) => (
          <TimeLine
            key={index}
            time={item.time}
            destination={item.destination}
          />
        ))} */}
        <img src={timetable} className="block h-auto w-full" />
      </div>
    </div>
  );
}
