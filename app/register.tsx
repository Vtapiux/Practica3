//Pantalla de mainmenu de pruebas
import { Text, View, StyleSheet, 
  TextInput, Pressable, Button, Image} from "react-native";
import {Link, router} from "expo-router";
import { useContext, useState } from "react";
import { MyContext } from "./Context";

export default function Index()
{
  //const {loginData, setLoginData}=useContext(MyContext);
  const [userValue, setUserValue] = useState('');
  const [failedRegister, setFailedRegister]=useState(false);

  const onButtonBackIndex = async ()=>{
    console.log("back login");
		router.replace('/');
  }

  return (
    <View style={styles.container}>
		<Text style={styles.title}>ConnectMe Register</Text>
		<Text >Conecta, Impacta, Destaca</Text>

		<View style={styles.inputfieldlabel}>
      <Text >ID</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
      </View>

    <View style={styles.inputfieldlabel}>
      <Text >Username</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
      </View>

    <View style={styles.inputfieldlabel}>
      <Text >Password</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
      </View>

    <View style={styles.inputfieldlabel}>
      <Text >First Name</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
      </View>

    <View style={styles.inputfieldlabel}>
      <Text >Last Name</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
      </View>

    <View style={styles.inputfieldlabel}>
      <Text >Email</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
      </View>


		{failedRegister? (<Text style={styles.error}>Usuario o contraseña incorrectos</Text>):undefined}

		<Pressable onPress={onButtonBackIndex}>  
			<Text>Completar Registro</Text>
		</Pressable>

		<Link href="/" asChild>
			<Button title ="Registrarse"></Button>
		</Link>

    </View>
	
  );
}

/* 
ESTRUCTURA DEL JSON LOGINDATA

credits: indica la cantidad de créditos que tiene el usuario
email: dirección de correo del usuario
firstname: contiene el nombre de pila del usuario
id: identificador único para el usuario del sistema
lastname: almacena el apellido del usuario
pfp_url: URL de la imagen de perfil del usuario
username: nombre de usuario que utiliza el usuario en el sistema
xp: puntos de experiencia (XP) que tiene el usuario
*/

const styles = StyleSheet.create(
  {
    container:{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
      fontSize:44,
		}, 
    profile:{
      backgroundColor:"#Faa",
      width:300,
      height:300,
      padding:10
    },
    footer:{
      position:"absolute",
      bottom:5,
      backgroundColor:"#afa",
      padding:10,
    },
    pfp_image:{
      width:260,
      height:260,
      borderRadius:5,
    },
    title:{
			fontFamily:'poppins',
			fontSize:44
		},
		inputfieldlabel:
		{
			flexDirection:'row', //verticalLayout 
			alignItems: 'center',
			justifyContent: 'center',
			width:'60%'
		},
		input: {
			height: 40,
			width:250,
			margin: 12,
			borderWidth: 1,
			padding: 10,
		  },
    error:{
      color: "#F00",
      padding: 5,
    },
  }
)