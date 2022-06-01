import React, { FC } from "react"
import { View, ViewStyle, TextStyle, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"


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

const DETAILS_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: 5,
}

export const WeatherDetailsScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const { weatherStore:{weather}} = useStores();
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
         
              <View style={LIST_CONTAINER}>
                <Image source={{ uri: weather.weather_icons }} style={IMAGE} />
                <View style={LIST_TEXT}>
                  <View style={DETAILS_CONTAINER}>
                    <Text preset="bold">Temperature</Text> 
                    <Text  style={LIST_TEXT}>{weather.temperature}</Text>
                  </View>
                  <View style={DETAILS_CONTAINER}>
                    <Text preset="bold">Wind Speed</Text>
                    <Text style={LIST_TEXT}>{weather.wind_speed}</Text> 
                  </View>
                  <View style={DETAILS_CONTAINER}>
                    <Text preset="bold">Precip</Text>  
                    <Text style={LIST_TEXT}>{weather.precip}</Text>
                  </View>
                </View>
              </View>
        </Screen>

      </View>
    )
  },
)
