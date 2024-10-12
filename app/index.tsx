import { Text, View, StyleSheet, 
		TextInput, Pressable
} from "react-native";
//para utilizar una fuente custom 
import { useFonts } from "expo-font";
import IconRocket from './iconrocket';
import IconCar from './iconcar';

//https://docs.expo.dev/develop/user-interface/fonts/
//https://reactsvgicons.com/react-svg-icons-guide

export default function Index() {

	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'),
	  });


  return (
    <View style={styles.container}>
		<IconRocket width='100' height='100'></IconRocket>
		<IconCar width='50' height='50'></IconCar> 
		<Text style={styles.title}>Regalify</Text>
		<Text >¡UN regalo sorpresa cada semana!</Text>
		<View style={styles.inputfieldlabel}>
			<Text >Usuario</Text>
			<TextInput style={styles.input}></TextInput>
		</View>
		<View style={styles.inputfieldlabel}>
			<Text >Contraseña</Text>
			<TextInput style={styles.input} secureTextEntry="true"></TextInput>
		</View>
		<Pressable style={styles.botonconlogo}
		 onPress={()=>{alert("no implementado")}}
		>
			<IconCar width='32' height='32'></IconCar>
			<Text>Accede YA</Text>
		</Pressable>
		<Text >¿No tienes una cuenta?</Text>
		<Pressable style={styles.botonconlogo}>  
			<IconRocket width='32' height='32'></IconRocket>
			<Text>Regístrate.</Text>
		</Pressable>

    </View>
	
  );
}

const styles=StyleSheet.create(
	{
		container:{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		title:{
			fontFamily:'poppins',
			fontSize:44
		},
		inputfieldlabel:
		{
			flexDirection:'row', //verticalLayout 
			alignItems: 'center',
			justifyContent: 'flex-end',
			width:'60%'
		},
		input: {
			height: 40,
			width:150,
			margin: 12,
			borderWidth: 1,
			padding: 10,
		  },
		botonconlogo:
		{
			backgroundColor:'#F9D689',
			flexDirection:'row',
			alignItems: 'center',
			padding:10,
			borderRadius:5
		},
		//#973131 #E0A75E #F9D689 #F5E7B2
		
	}
)