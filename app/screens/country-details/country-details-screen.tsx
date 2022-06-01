import React, { FC } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { loader } from "../../components/loader/loader"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const DETAILS_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: 5,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
export const CountryDetailScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const {countryStore:{countries}, weatherStore:{getWeather}} = useStores();
    const handleWeather =  (capital:string) => async () => {
      loader.show()
      const resp = await getWeather(capital)
      loader.hide()
      resp && navigation.navigate("weatherDetails")
    }
    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="WeatherDetailScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...countries]}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Image source={{ uri: item.flag }} style={IMAGE} />
                <View style={LIST_TEXT}>
                  <View style={DETAILS_CONTAINER}>
                    <Text preset="bold">Capital</Text>  
                    <Text style={LIST_TEXT}>{item.capital}</Text>
                  </View>
                  <View style={DETAILS_CONTAINER}>
                    <Text preset="bold">Population</Text> 
                    <Text  style={LIST_TEXT}>{item.population}</Text>
                  </View>
                  <View style={DETAILS_CONTAINER}>
                    <Text preset="bold">latlng</Text>
                    <Text style={LIST_TEXT}>{item.latlng}</Text> 
                  </View>
                  <View style={DETAILS_CONTAINER}>
                    <Button
                      onPress={handleWeather(item.capital)}
                      style={CONTINUE}
                      textStyle={CONTINUE_TEXT}
                      testID="next-screen-button"
                      tx="CountryDetailScreen.capitalWeather"
                    />
                  </View>
                </View>
              </View>
            )}
          />
        </Screen>

      </View>
    )
  },
)
