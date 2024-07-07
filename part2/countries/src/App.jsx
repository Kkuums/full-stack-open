import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  if (!countries) {
    return null;
  }

  return (
    <div>
      <Countries countries={countries} />
    </div>
  );
};

export default App;
