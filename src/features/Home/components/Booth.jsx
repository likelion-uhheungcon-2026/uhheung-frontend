export default function Booth({ booth, setSelectedBoothId }) {
  return (
    <div
      onClick={() => {
        setSelectedBoothId(booth.id);
      }}
      className="cursor-pointer"
    >
      {booth.id}
    </div>
  );
}
