export default function SmallCard({
  title,
  boothId,
  setSelectedBoothId,
  setIsOpen,
  setTab,
  booths,
}) {
  const handleClick = () => {
    setSelectedBoothId(boothId);
    setTab("booth");
    setIsOpen(true);
  };
  const booth = booths.find((b) => b.id === boothId);

  return (
    <div
      onClick={handleClick}
      className="
        relative
        w-[11rem]
        h-[8.96875rem]
        rounded-[0.625rem]
        overflow-hidden
        cursor-pointer
        border-box
      "
    >
      <img
        src={booth.serviceimage}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      <div
        className="
          absolute
    left-0
    right-0
    -bottom-[0.2rem]
    top-0
          bg-[linear-gradient(180deg,rgba(20,20,20,0)_50%,#141414_100%)]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          px-[1.1rem]
          pb-[0.3rem]
          text-white
        "
      >
        <div className="text-[1rem] font-sbaggro font-normal">{title}</div>
      </div>
    </div>
  );
}
