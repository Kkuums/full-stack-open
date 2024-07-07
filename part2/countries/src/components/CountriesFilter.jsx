const CountriesFilter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default CountriesFilter;
