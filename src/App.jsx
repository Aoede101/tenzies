import { useState } from "react";
import "./App.scss";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  const hasWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => dice[0].value === die.value);

  function generateAllNewDice() {
    return [...Array(10)].map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function toggleDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  function handleRoll() {
    if (hasWon) setDice(generateAllNewDice());
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld
          ? die
          : {
              ...die,
              value: Math.ceil(Math.random() * 6),
            },
      ),
    );
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
      <div className="dice-container">{diceElements}</div>
      <button className="roll-btn" onClick={handleRoll}>
        {hasWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
