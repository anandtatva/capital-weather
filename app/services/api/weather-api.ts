import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetWeatherResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class WeatherApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getWeather(capital: string): Promise<GetWeatherResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "http://api.weatherstack.com/current?access_key=f580fcdaef6370f93b9a17a98ebeb0ce&query=" + capital
      )
      // the typical ways to die when calling an api
      if (!response.ok) {
        response.data?.message && alert(response.data.message)
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const {
        wind_speed,
        weather_icons,
        precip,
        temperature
      } = response.data.current
      const weather = {
        temperature,
        wind_speed,
        precip,
        weather_icons: weather_icons[0]
      }
      return { kind: "ok", weather }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
