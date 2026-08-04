export default function Booth({
  booth,
  column,
  selectedBoothId,
  setSelectedBoothId,
}) {
  const isEven = booth.id % 2 === 0;
  const isSelected = selectedBoothId === booth.id;

  const baseColor = isEven ? "#262626" : "#363636";

  const opacityMap = {
    1: 0,
    2: 0.05,
    3: 0.1,
    4: 0.15,
    5: 0.2,
  };

  const opacity = opacityMap[column] ?? 0;

  const background =
    opacity === 0
      ? baseColor
      : `linear-gradient(
          0deg,
          rgba(255,96,0,${opacity}) 0%,
          rgba(255,96,0,${opacity}) 100%
        ), ${baseColor}`;

  return (
    <div
      onClick={() => setSelectedBoothId(booth.id)}
      className="
        cursor-pointer
        w-[2.23438rem]
        h-[2.5rem]
        rounded-[0.125rem]
        border
        flex
        flex-col
        justify-center
        items-center
        gap-[0.1rem]
      "
      style={{
        background,
        borderColor: isSelected ? "#FF6000" : "transparent",
      }}
    >
      <div
        className="text-[1rem] leading-none"
        style={{
          color: isSelected ? "#FF6000" : "#FFFFFF",
        }}
      >
        {booth.id}
      </div>

      <div
        className="text-[0.4375rem] font-extralight"
        style={{
          color: isSelected ? "#FF6000" : "#FFFFFF",
        }}
      >
        {booth.name}
      </div>
    </div>
  );
}
