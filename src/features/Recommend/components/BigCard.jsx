import test from "../../BoothDetail/assets/킽ㅣ.jpg";

export default function BigCard() {
  return (
    <div
      className="
        relative
        w-[22.5rem]
          h-[8.96875rem]
        aspect-[11/13.25]
        rounded-[0.625rem]
        overflow-hidden
        cursor-pointer
        border-box
      "
    >
      <img
        src={test}
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
          inset-0
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
          pb-[0.5rem]
          text-white
        "
      >
        <div className="fw-full flex justify-between items-end">
          <div className="text-[1rem] font-sbaggro ">추천 작품</div>

          <div className="flex flex-col items-end text-[0.875rem] font-sbaggro ">
            <div>19번</div>
            <div>트래블</div>
          </div>
        </div>
      </div>
    </div>
  );
}
