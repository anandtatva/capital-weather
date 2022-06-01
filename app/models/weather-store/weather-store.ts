import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WeatherApi } from "../../services/api/weather-api";
import { withEnvironment } from "../extensions/with-environment";
import { WeatherModel, WeatherSnapshot } from "../weather/weather";

/**
 * Model description here for TypeScript hints.
 */
export const WeatherStoreModel = types
  .model("WeatherStore")
  .props({
    weather: types.maybe(WeatherModel),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveWeather: (weatherSnapshots: WeatherSnapshot) => {
      self.weather = weatherSnapshots
    }
  }))
  .actions((self) => ({
    getWeather: async (capital:string):Promise<boolean> => {
      const countryApi = new WeatherApi(self.environment.api)
      const result = await countryApi.getWeather(capital)
      if (result.kind === "ok") {
        self.saveWeather(result.weather)
        return true
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false
      }
    },
  }));
type WeatherStoreType = Instance<typeof WeatherStoreModel>
export interface WeatherStore extends WeatherStoreType {}
type WeatherStoreSnapshotType = SnapshotOut<typeof WeatherStoreModel>
export interface WeatherStoreSnapshot extends WeatherStoreSnapshotType {}
export const createWeatherStoreDefaultModel = () => types.optional(WeatherStoreModel, {})
