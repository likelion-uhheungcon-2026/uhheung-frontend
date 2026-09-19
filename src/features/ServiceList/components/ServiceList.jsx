import ServiceListItem from "./ServiceListItem";

export default function ServiceList({
  booths,
  selectedFilters,
  selectedCategories,
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-[0.5rem]
        mt-[1rem]
        mb-[1.56rem]
      "
    >
      {booths.map((booth) => (
        <ServiceListItem
          key={booth.id}
          booth={booth}
          isTagSelected={selectedFilters.includes(booth.tag)}
          isCategorySelected={selectedCategories.includes(booth.category)}
        />
      ))}
    </div>
  );
}
