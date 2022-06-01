import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const WeatherModel = types
  .model("Weather")
  .props({
    temperature: types.number,
    weather_icons: types.string,
    precip:types.number,
    wind_speed:types.number
  })

type WeatherType = Instance<typeof WeatherModel>
export interface Weather extends WeatherType {}
type WeatherSnapshotType = SnapshotOut<typeof WeatherModel>
export interface WeatherSnapshot extends WeatherSnapshotType {}
export const createWeatherDefaultModel = () => types.optional(WeatherModel, {})
