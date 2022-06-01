import { CountryStoreModel } from "./country-store"

test("can be created", () => {
  const instance = CountryStoreModel.create({})

  expect(instance).toBeTruthy()
})
