import { Instance, SnapshotOut, types } from "mobx-state-tree"


/**
 * Model description here for TypeScript hints.
 */
export const CountryModel = types
  .model("Country")
  .props({
    capital: types.string,
    population: types.number,
    latlng: types.string,
    flag: types.string
  })

type CountryType = Instance<typeof CountryModel>
export interface Country extends CountryType {}
type CountrySnapshotType = SnapshotOut<typeof CountryModel>
export interface CountrySnapshot extends CountrySnapshotType {}
export const createCountryDefaultModel = () => types.optional(CountryModel, {})
