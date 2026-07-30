export default function BoothDetail({ booth }) {
  return (
    <div className="text-[0.75rem] mt-[1rem] mb-[2.3rem] font-extralight">
      <div>{booth.content}</div>

      <div className="mt-[1rem]">
        <div className="text-[1rem] font-medium">주요기능</div>

        <ul className="list-disc pl-[1rem]">
          {booth.function.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-[1rem]">
        <div className="text-[1rem] font-medium">기술 스택</div>

        <ul className="list-disc pl-[1rem]">
          {booth.techstack.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-[1rem]">
        <div className="text-[1rem] font-medium">회고</div>
        <div>{booth.retrospect}</div>
      </div>
    </div>
  );
}
