import { useState } from "react";
import CountriesFilter from "./CountriesFilter";
import Country from "./Country";
import CountryData from "./CountryData";

const Countries = ({ countries }) => {
  const [newFilter, setNewFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  );

  const toggleData = (name) => {
    const country = filteredCountries.find((c) => c.name.common === name);
    setSelectedCountry(country);
  };

  let returnedCountries;

  if (newFilter === "") {
    returnedCountries = null;
  } else if (filteredCountries.length > 10) {
    returnedCountries = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 1) {
    returnedCountries = <CountryData country={filteredCountries[0]} />;
  } else {
    returnedCountries = (
      <ul>
        {filteredCountries.map((country) => (
          <Country
            key={country.name.official}
            country={country}
            toggleData={toggleData}
          />
        ))}
      </ul>
    );
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <div>
      <CountriesFilter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      {returnedCountries}
      {selectedCountry && <CountryData country={selectedCountry} />}
    </div>
  );
};

export default Countries;
