import image from "../assets/킽ㅣ.jpg";

export default function MainCard() {
  return (
    <div className="relative mt-[0.7rem] w-[22.5rem] h-[12.3125rem] overflow-hidden rounded-t-[0.625rem]">
      <img src={image} className="w-full h-full object-cover" />

      {/* 아래쪽 어둡게 그라데이션 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_41.3%,#000_100%)]" />
    </div>
  );
}
