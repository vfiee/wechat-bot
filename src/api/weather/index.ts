import axios from "axios"
import {
  WeatherTemplateData,
  WeatherPosition,
} from "../../plugins/weather/config"

export const getWeather = async (
  position: WeatherPosition
): Promise<WeatherTemplateData | null> => {
  const address = await axios
    .get(
      `https://gaode.com/service/regeo?longitude=${position.longitude}&latitude=${position.latitude}`
    )
    .catch((_) => null)
  if (!address) return null
  const { province, city, district, pos, cityadcode, adcode } =
    address["data"]["data"] || {}
  if (!(adcode || cityadcode)) return null
  const weather = await axios
    .get(`https://gaode.com/service/weather?adcode=${cityadcode}`)
    .catch((_) => null)
  if (!weather) return null
  try {
    const data = weather.data["data"]["data"][0]
    const {
      min_temp,
      max_temp,
      daynight,
      wind_power_desc,
      wind_direction_desc,
    } = data["forecast_data"][0] || {}
    const [minWind, maxWind] = wind_power_desc.split("-")
    return {
      date: data["forecast_date"] || "",
      weather: (data.live.weather_name as string) || "",
      temperature: data.live.temperature || "",
      minTemperature: min_temp || 0,
      maxTemperature: max_temp || 0,
      minWind,
      maxWind,
      windDirection: wind_direction_desc,
      isDay: !daynight,
      isNight: !!daynight,
      address: province + city + district + pos,
    } as WeatherTemplateData
  } catch (_) {}
  return null
}
