import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CountryStoreModel } from "../country-store/country-store"
import { WeatherStoreModel } from "../weather-store/weather-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  countryStore: types.optional(CountryStoreModel, {} as any),
  weatherStore: types.optional(WeatherStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
