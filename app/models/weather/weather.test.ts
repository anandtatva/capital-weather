import { WeatherModel } from "./weather"

test("can be created", () => {
  const instance = WeatherModel.create({})

  expect(instance).toBeTruthy()
})
