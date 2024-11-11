//Pantalla de register de pruebas
import { Text, View, StyleSheet, 
  TextInput, Pressable, Button, Image} from "react-native";
import {Link, router} from "expo-router";
import { useContext, useState } from "react";
import { AuthContext } from "./Context";
import { Endpoints } from '../constants/Endpoint'; //se pone entre llaves porque es un objeto JavaScript (JSON)
import * as Crypto from 'expo-crypto';

export default function Register()
{
  //const {loginData, setLoginData}=useContext(MyContext);
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [firstname, setFirsname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedRegister, setFailedRegister]=useState(false);
  const { registerUser, setRegisterUser } = useContext(AuthContext);

  // Function to validate email format
  const validarEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Check if all fields are filled
  const validarCamposLlenos = () => {
    return username && userID && firstname && lastname && email && password;
  };

  // Check if the username, ID or email already exist
  const validacionRegistro = () => {
    if (!validarCamposLlenos()) {
      setErrorMessage("Todos los campos deben estar llenos.");
      return false;
    }

    if (!validarEmail(email)) {
      setErrorMessage("El correo ingresado no es válido");
      return false;
    }
    // Additional checks for existing username and ID would go here, depending on your backend
    return true;
  };
  
  const onButtonBackIndex = async () => {
    if (!validacionRegistro()) {
      setFailedRegister(true);
      return;
    }

    const passwordDigest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256, password);
    console.log(passwordDigest);

    const form = new FormData();
		form.append('token','code37');
    form.append('id',userID);
		form.append('username',username);
		form.append('pass',passwordDigest);
    form.append('firstname',firstname);
    form.append('lastname',lastname);
    form.append('email',email);
  
    fetch(Endpoints.REGISTER, {
			method: 'POST',
			body:form,
		})
		.then( response => response.json()
		).then( dataR=> {
			if(!dataR.error && dataR.id)
			{
				setRegisterUser(dataR);
				router.replace('/'); 
			}
			else
				setFailedRegister(true);
        setErrorMessage("Error al registrar. Por favor, intente de nuevo.");
		} )
    .catch(err => {
      console.log(err);
      setFailedRegister(true);
      setErrorMessage("Error de conexión. Intenta nuevamente.");
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ConnectMe Register</Text>
      <Text>Conecta, Impacta, Destaca</Text>
      <Text>Inicia tu registro con nosotros</Text>

      <View style={styles.inputfieldlabel}>
        <Text >ID</Text>
        <TextInput style={styles.input} onChangeText={setUserID}></TextInput>
        </View>

      <View style={styles.inputfieldlabel}>
        <Text >Username</Text>
        <TextInput style={styles.input} onChangeText={setUsername}></TextInput>
        </View>

      <View style={styles.inputfieldlabel}>
        <Text >Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword}></TextInput>
        </View>

      <View style={styles.inputfieldlabel}>
        <Text >First Name</Text>
        <TextInput style={styles.input} onChangeText={setFirsname}></TextInput>
        </View>

      <View style={styles.inputfieldlabel}>
        <Text >Last Name</Text>
        <TextInput style={styles.input} onChangeText={setLastname}></TextInput>
        </View>

      <View style={styles.inputfieldlabel}>
        <Text >Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail}></TextInput>
        </View>

      {failedRegister? (<Text style={styles.error}>{errorMessage}</Text>):undefined}
{/* 
      <Pressable onPress={onButtonBackIndex} style={styles.button}> 
			  <Text>Regístrate.</Text>
		  </Pressable>

      <Link href="/" asChild>
        <Button title ="Registrarse"></Button>
      </Link>
*/}
      <Link href="/" asChild>
        <Pressable onPress={onButtonBackIndex} style={styles.button}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </Pressable>
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
    button: {
      backgroundColor: '#007bff', // Color de fondo del botón
      paddingVertical: 12, // Espaciado vertical
      paddingHorizontal: 20, // Espaciado horizontal
      borderRadius: 5, // Bordes redondeados
      alignItems: 'center', // Centra el texto horizontalmente
      justifyContent: 'center', // Centra el texto verticalmente
      marginVertical: 10, // Espacio entre botones
    },
    buttonText: {
      color: 'white', // Color del texto
      fontSize: 16, // Tamaño de la fuente
      fontWeight: 'bold', // Hacer el texto en negrita
    },
  }
)