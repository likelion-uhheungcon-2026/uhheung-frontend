import ServiceListItem from "./ServiceListItem";

export default function ServiceList({ booths }) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-x-[8px]
        gap-y-[0.2rem]
        mt-[1.56rem]
        mb-[1.56rem]
      "
    >
      {booths.map((booth) => (
        <ServiceListItem key={booth.id} booth={booth} />
      ))}
    </div>
  );
}
