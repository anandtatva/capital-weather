import { WeatherStoreModel } from "./weather-store"

test("can be created", () => {
  const instance = WeatherStoreModel.create({})

  expect(instance).toBeTruthy()
})
