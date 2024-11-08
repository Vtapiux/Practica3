//Pantalla de mainmenu de pruebas
import {View, Text, StyleSheet} from "react-native";
import {router} from "expo-router";

export default function Index()
{
  return (
    <View style={styles.container}>
      <Text>Equipo ConnectMe</Text>
      
      <Text>Grupo 901CIB</Text>
      <Text>Emiliano Jorge García Vázquez</Text>
      <Text>Marco Antonio Graciano Ortíz</Text>
      <Text>Valeria Tapia</Text>      
    </View>
    
  )
}

const styles = StyleSheet.create(
  {
    container:{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
      fontSize:44,
		}
  }
)