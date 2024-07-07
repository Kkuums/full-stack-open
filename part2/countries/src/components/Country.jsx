const Country = ({ country, toggleData }) => {
  const handleToggle = () => {
    toggleData(country.name.common);
  };

  return (
    <li>
      {country.name.common}
      <span> </span>
      <button onClick={handleToggle}>show</button>
    </li>
  );
};

export default Country;
