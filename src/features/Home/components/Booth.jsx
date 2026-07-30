export default function Booth({ booth, setSelectedBoothId }) {
  return (
    <div
      onClick={() => {
        setSelectedBoothId(booth.id);
      }}
      className="cursor-pointer
      w-[2.23438rem]
      h-[2.5rem]
      rounded-[0.125rem] bg-[#363636]
      flex flex-col justify-center gap-[0.1rem] items-center"
    >
      <div className="text-[1rem] leading-none">{booth.id}</div>
      <div className="text-[0.4375rem] font-extralight">{booth.name}</div>
    </div>
  );
}
