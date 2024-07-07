import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_SOME_KEY;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getCountryWeather = async (lat, lng) => {
  const response = await axios.get(
    `${weatherApiUrl}?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
  );
  return response.data;
};

export default { getAll, getCountryWeather };
