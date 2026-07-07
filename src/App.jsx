import { useEffect, useState } from "react";
import "./App.scss";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
import Scores from "./components/Scores";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());
  const [rollCount, setRollCount] = useState(0);
  const [bestRollCount, setBestRollCount] = useState(
    JSON.parse(localStorage.getItem("bestRollCount")) ?? null,
  );
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const hasWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => dice[0].value === die.value);

  useEffect(() => {
    localStorage.setItem(
      "bestRollCount",
      JSON.stringify(bestRollCount),
    );
  }, [bestRollCount]);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  useEffect(() => {
    if (hasWon) {
      setIsRunning(false);
    }
  }, [hasWon]);

  function getRandomDiceExcept(num) {
    const arr = [1, 2, 3, 4, 5, 6];
    arr.splice(num - 1, 1);

    return arr[Math.floor(Math.random() * 5)];
  }

  function generateAllNewDice() {
    return [...Array(10)].map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function toggleDie(id) {
    setIsRunning(true);

    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  function handleRoll() {
    // incement count

    setRollCount((prevRollCount) => prevRollCount + 1);

    // roll unheld dice
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld
          ? die
          : {
              ...die,
              value: getRandomDiceExcept(die.value),
            },
      ),
    );
  }

  function handleNewGame() {
    // save count to local storage
    if (bestRollCount === null || rollCount < bestRollCount)
      setBestRollCount(rollCount);
    /* CHANGE */
    setRollCount(0); // reset count

    // reset dice
    setDice(generateAllNewDice());
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleDie={toggleDie}
    />
  ));

  const rollBtn = hasWon ? (
    <button className="roll-btn" onClick={handleNewGame}>
      New Game
    </button>
  ) : (
    <button className="roll-btn" onClick={handleRoll}>
      Roll
    </button>
  );

  return (
    <main>
      {hasWon && <ReactConfetti />}
      <article>
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to
          freeze it at its current value between rolls.
        </p>
      </article>
      <Scores
        rollCount={rollCount}
        bestRollCount={bestRollCount}
        time={time}
      />
      <div className="dice-container">{diceElements}</div>
      {rollBtn}
    </main>
  );
}

export default App;
