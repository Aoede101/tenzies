export default function Scores({
  rollCount,
  bestRollCount,
  time,
}) {
  const bestScore =
    !bestRollCount || bestRollCount === "null"
      ? "---"
      : bestRollCount;
  return (
    <div className="scores-container">
      <div className="score">
        <h3 className="title">Rolls</h3>
        <p className="data">{rollCount}</p>
      </div>
      <div className="divider"></div>
      <div className="score best">
        <h3 className="title">Best</h3>
        <p className="data">{bestScore}</p>
      </div>
      <div className="divider"></div>
      <div className="score">
        <h3 className="title">Time</h3>
        <p className="data">{time}</p>
      </div>
    </div>
  );
}
