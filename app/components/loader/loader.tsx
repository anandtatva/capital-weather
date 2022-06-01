import * as React from "react"
import { StyleProp, Modal, ActivityIndicator, View, ViewStyle } from "react-native"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: "#0101011c",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}
let _handleLoader;

export const loader ={
  show: () => {
    if(_handleLoader) _handleLoader(true)
  },
  hide: () => {
    if(_handleLoader) _handleLoader(false)
  }
}

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export function Loader(props: LoaderProps) {
  const [visible, setVisible] = React.useState(false);
  const { style } = props
  const styles = Object.assign({}, CONTAINER, style)

  React.useEffect(() => {
    _handleLoader = setVisible
  }, [])

  return (
    <Modal 
      transparent 
      animationType="none"
      visible={visible}
    >
      <View style={styles}>
        <ActivityIndicator color={color.palette.deepPurple} size="large" />  
      </View>
    </Modal>
  )
}
