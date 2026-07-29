import ServiceListItem from "./ServiceListItem";

export default function ServiceList() {
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
      <ServiceListItem />
      <ServiceListItem />
      <ServiceListItem />
      <ServiceListItem />
      <ServiceListItem />
      <ServiceListItem />
      <ServiceListItem />
      <ServiceListItem />
    </div>
  );
}
