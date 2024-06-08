import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ value, text }) => {
  if (text === "positive")
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    );

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={percentage} />
        </tbody>
      </table>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    const newTotal = newGood + neutral + bad;
    setTotal(newTotal);
    setAverage((newGood - bad) / newTotal);
    setPercentage((newGood / newTotal) * 100);
  };

  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    const newTotal = newNeutral + good + bad;
    setTotal(newTotal);
    setAverage((good - bad) / newTotal);
    setPercentage((good / newTotal) * 100);
  };

  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    const newTotal = newBad + good + neutral;
    setTotal(newTotal);
    setAverage((good - newBad) / newTotal);
    setPercentage((good / newTotal) * 100);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        percentage={percentage}
      />
    </div>
  );
}

export default App;
