export default function MainCard({ booth, variant = "sheet" }) {
  const isPage = variant === "page";

  return (
    <div
      className={`relative w-full overflow-hidden ${
        isPage
          ? "h-[15rem] rounded-[0.625rem]"
          : "h-[12.3125rem] rounded-t-[0.625rem]"
      }`}
    >
      <img
        src={booth.serviceimage}
        alt={`${booth.name} 서비스 화면`}
        className="h-full w-full object-cover"
      />

      {/* 아래쪽 어둡게 그라데이션 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_41.3%,#000_100%)]" />
    </div>
  );
}
