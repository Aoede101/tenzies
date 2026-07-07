export default function Die({
  toggleDie,
  id,
  value,
  isHeld,
}) {
  return (
    <button
      className={isHeld ? "held" : ""}
      onClick={() => {
        toggleDie(id);
      }}
    >
      {value}
    </button>
  );
}
