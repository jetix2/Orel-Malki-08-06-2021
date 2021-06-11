import axios from "axios";
import { toast } from "react-toastify";
import { sample } from "lodash";
const apikey = [
  "WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0",
  "rYBVyyZFhtZkPwiQI6eQWaIYipiGFVma",
  "8MIzGGl33vxvfOwRUAaO7amkjot7RP42",
  "yPu77kXYByuhCrrRLTdrrNqPQmJKi1WO",
  "FKwlSoqGXQpxkE9rsEAW9hUU15KQxmAG",
  "O9AFzM6d6HAnPRzuuq1XvGAsCdGNMMgh",
  "PyDoAhvagvVRatEbkpAC6NS64Qqw7KIP",
  "b1rtH1c7YGAGM5oe3z8xmeRuenABGxtA"
];
const baseUrl = "https://dataservice.accuweather.com/";
const returnKey = () => sample(apikey);

export async function autocomplete(locationKey) {
  try {
    const { data } = await axios(
      `${baseUrl}locations/v1/cities/autocomplete?apikey=${returnKey()}&q=${locationKey}`
    );
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getCurrentCondition(locationKey) {
  try {
    const { data } = await axios(
      `${baseUrl}currentconditions/v1/${locationKey}?apikey=${returnKey()}&details=true`
    );
    return data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getFiveDayWeather(locationKey) {
  try {
    const { data } = await axios(
      `${baseUrl}forecasts/v1/daily/5day/${locationKey}?apikey=${returnKey()}&metric=${true}`
    );
    return data.DailyForecasts;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getCurrentLocation() {
  try {
    const location = await getUserLocation();
    const { coords } = location;
    if (!coords) return;
    const { data } = await axios(
      `${baseUrl}locations/v1/cities/geoposition/search?apikey=${returnKey()}&q=${coords.latitude},${coords.longitude}`
    );

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

const getUserLocation = () =>
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (location) => resolve(location),
      (error) => {
        resolve(error);
        toast(error.message);
      }
    );
  });