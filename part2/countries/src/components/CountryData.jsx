import { useState, useEffect } from "react";
import countryService from "../services/countries";

const CountryData = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await countryService.getCountryWeather(
        country.latlng[0],
        country.latlng[1]
      );
      setWeatherData(data);
      setLoading(false);
    };

    fetchWeather();
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>

      <h2>languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>

      <img alt={country.flags.alt} src={country.flags.png} />

      <h2>Weather in {country.capital}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>temperature {weatherData.main.temp} Celsius</p>
          <img
            alt="Weather icon"
            src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default CountryData;
