import {
    CITY_FORECAST_REQUEST,
    CITY_FORECAST_SUCCESS,
    CITY_FORECAST_FAIL,
  } from "../constants/cityForecastConstants";
  import { getCurrentCondition, getFiveDayWeather } from "../apis/apis";
  
  export const getCityForecast = (key, name) => async (dispatch) => {
    try {
      dispatch({ type: CITY_FORECAST_REQUEST });
  
      const days = await getFiveDayWeather(key);
      const currentCondition = await getCurrentCondition(key);
      const data = { days, key, name, currentCondition };
  
      dispatch({
        type: CITY_FORECAST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CITY_FORECAST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };