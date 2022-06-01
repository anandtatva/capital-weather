import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetCountriesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class CountryApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getCountries(countryName: string): Promise<GetCountriesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get("name/" + countryName)
      // the typical ways to die when calling an api
      if (!response.ok) {
        response.data?.message && alert(response.data.message)
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const countries = response.data?.map(({capital, latlng, flags, population})=>({
        population, 
        capital, 
        flag: flags?.png || "",
        latlng: String(latlng)
      }))

      return { kind: "ok", countries }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
