import test from "../../BoothDetail/assets/킽ㅣ.jpg";

export default function SmallCard({ title }) {
  return (
    <div
      className="
        relative
        w-[11rem]
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
          pb-[0.3rem]
          text-white
        "
      >
        <div className="text-[1rem] font-sbaggro font-normal">{title}</div>
      </div>
    </div>
  );
}
