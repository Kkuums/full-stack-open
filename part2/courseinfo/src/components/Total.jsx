const Total = ({ course }) => {
  const exercisesTotal = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <strong>
      <p>Number of exercises {exercisesTotal}</p>
    </strong>
  );
};

export default Total;
