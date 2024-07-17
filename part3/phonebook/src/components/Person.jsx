const Person = ({ name, number, handleDelete }) => {
  return (
    <div>
      {name} {number}
      <span> </span>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Person;
