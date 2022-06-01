import { GeneralApiProblem } from "./api-problem"
import { Country, Weather } from "../../models"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCountriesResult = { kind: "ok"; countries: Country[] } | GeneralApiProblem

export type GetWeatherResult = { kind: "ok"; weather: Weather } | GeneralApiProblem
