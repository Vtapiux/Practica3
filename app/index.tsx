import { Text, View, StyleSheet, 
		TextInput, Pressable, Button
} from "react-native";
import * as Crypto from 'expo-crypto';
import { useFonts } from "expo-font"; //para utilizar una fuente custom 
import IconLogo from './iconrocket';
import { Endpoints } from '../constants/Endpoint'; //se pone entre llaves porque es un objeto JavaScript (JSON)
import { Link, router } from "expo-router" //para navegar entre ventanas

import { useContext, useState } from "react";
import { MyContext } from "./Context";

//https://docs.expo.dev/develop/user-interface/fonts/
//https://reactsvgicons.com/react-svg-icons-guide

export default function Index() {

	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'),
	  });

	const [userValue, setUserValue] = useState('');
	const [passValue, setPassValue] = useState('');	
	const [failedLogin, setFailedLogin]=useState(false);
	//Hace que las variables loginData y setLoginData correspondan con las que provee MyContext
	const {loginData, setLoginData} = useContext(MyContext);
	
	const onPassValue = (pass) =>
	{
		setPassValue(pass);
	}
	
	const onButtonRegister = async ()=>{
		console.log("register");
		router.replace('/register')
	}

	//BOTÓN DE LOGIN
	const onButtonLogin = async ()=>
	{
		console.log("logging in");
		//hacer la peticion de login
		//console.log('requesting '+Endpoints.LOGIN);
		
		//hashear la contraseña
		//await: función que tarda en regresar, no es síncrona

		if (!userValue || !passValue) {
			setFailedLogin(true); // Muestra el mensaje de error
			return; // Termina la ejecución de la función
		}

		const passDigest = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256, passValue);
		console.log(passDigest);

		const form = new FormData();
		form.append('token','code37');
		form.append('user',userValue);
		form.append('pass',passDigest);
		
		fetch(Endpoints.LOGIN, {
			method: 'POST',
			body:form,
		})
		.then( response => response.json()
		).then( data=> {
			if(!data.error && data.id)
			{
				setLoginData(data);
				router.replace('/mainmenu'); //Reemplaza la pantalla principal por mainmenu una vez se logra login
			}
			else
				setFailedLogin(true);
		} )
		.catch(err=>{ console.log(err) });
	}


	return (
		<View style={styles.container}>
		  <View style={styles.innerContainer}>
			<IconLogo width={100} height={100} />
			<Text style={styles.title}>ConnectMe</Text>
			<Text style={styles.subtitle}>Conecta, Impacta, Destaca</Text>
	
			<View style={styles.inputFieldLabel}>
			  <Text style={styles.label}>Usuario</Text>
			  <TextInput
				style={styles.input}
				onChangeText={setUserValue}
				placeholder="Ingresa tu usuario"
			  />
			</View>
	
			<View style={styles.inputFieldLabel}>
			  <Text style={styles.label}>Contraseña</Text>
			  <TextInput
				style={styles.input}
				secureTextEntry={true}
				onChangeText={setPassValue}
				placeholder="Ingresa tu contraseña"
			  />
			</View>
	
			{failedLogin ? (<Text style={styles.error}>Usuario o contraseña incorrectos</Text>):undefined}
	
			<Pressable style={styles.buttonWithIcon} onPress={onButtonLogin}>
			  <Text style={styles.buttonText}>Log In</Text>
			</Pressable>
	
			<Text style={styles.infoText}>¿No tienes una cuenta?</Text>
	
			<Pressable style={styles.buttonWithIcon} onPress={onButtonRegister}>
			  <Text style={styles.buttonText}>Regístrate</Text>
			</Pressable>
		{/* 
			<Link href="/mainmenu" asChild>
			  <Button title="Ir a Main Menu" color="#FFC900" />
			</Link>
		*/}
		  </View>	
		</View>
	  );
	}
	
	const styles = StyleSheet.create({
	  container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFC900", // Fondo amarillo brillante
	  },
	  innerContainer: {
		width: "80%",
		padding: 20,
		backgroundColor: "#90A8ED",
		borderWidth: 4,
		borderColor: "#000",
		borderRadius: 8,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 8, height: 8 },
		shadowOpacity: 1,
		shadowRadius: 0,
	  },
	  title: {
		fontSize: 32,
		fontWeight: "900",
		color: "#000",
		marginBottom: 10,
		textTransform: "uppercase",
	  },
	  subtitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
		marginBottom: 20,
	  },
	  inputFieldLabel: {
		width: "100%",
		marginBottom: 10,
	  },
	  label: {
		fontSize: 16,
		fontWeight: "700",
		color: "#000",
		marginBottom: 5,
	  },
	  input: {
		height: 40,
		borderColor: "#000",
		borderWidth: 2,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: "#FFF",
	  },
	  error: {
		color: "#FF0000",
		padding: 5,
		fontSize: 14,
		marginTop: 5,
	  },
	  buttonWithIcon: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FF90E8",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 6,
		borderWidth: 3,
		borderColor: "#000",
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 5 },
		shadowOpacity: 1,
		shadowRadius: 0,
		marginTop: 15,
	  },
	  buttonText: {
		color: "#000",
		fontSize: 16,
		fontWeight: "700",
		marginLeft: 10,
		textTransform: "uppercase",
	  },
	  infoText: {
		color: "#000",
		fontSize: 16,
		fontWeight: "600",
		marginTop: 20,
		marginBottom: 10,
	  },
	});