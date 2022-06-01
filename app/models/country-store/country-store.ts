import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CountryApi } from "../../services/api/country-api";
import { CountryModel, CountrySnapshot } from "../country/country"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const CountryStoreModel = types
  .model("CountryStore")
  .props({
    countryName: types.optional(types.string, ""),
    countries: types.optional(types.array(CountryModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCountry: (countrySnapshots: CountrySnapshot[]) => {
      self.countries.replace(countrySnapshots)
    },
    saveCountryName: (countryName: string) => {
      self.countryName = countryName; 
    },
  }))
  .actions((self) => ({
    getCountries: async ():Promise<boolean> => {
      const countryApi = new CountryApi(self.environment.api)
      const result = await countryApi.getCountries(self.countryName)
      if (result.kind === "ok") {
        self.saveCountry(result.countries)
        return true
      } else {
        __DEV__ && console.tron.log(result.kind)
        return false
      }
    },
  }))
type CountryStoreType = Instance<typeof CountryStoreModel>
export interface CountryStore extends CountryStoreType {}
type CountryStoreSnapshotType = SnapshotOut<typeof CountryStoreModel>
export interface CountryStoreSnapshot extends CountryStoreSnapshotType {}
export const createCountryStoreDefaultModel = () => types.optional(CountryStoreModel, {})
