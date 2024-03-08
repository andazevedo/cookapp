import Animated, {SlideInDown, BounceOutDown} from "react-native-reanimated"
import { View, Text } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { styles } from "./styles"
import { theme } from "@/src/theme"
import { Button } from "../Button"
type Props = {
    quantity: number,
    onClear: () => void,
    onSearch: () => void,
}

export function Selected({quantity, onClear, onSearch}: Props){
    return(
      <Animated.View 
      style={styles.container} 
      entering={SlideInDown.duration(500)} 
      exiting={BounceOutDown.duration(1000)}>
        <View style={styles.header}>
        <Text style={styles.label}>{quantity} ingredientes selecionados</Text>
        <MaterialIcons name="delete" size={24} onPress={onClear} color={theme.colors.gray_400}></MaterialIcons>
        </View>

        <Button title="Encontrar" onPress={onSearch}></Button>
        </Animated.View>
    )
 }   