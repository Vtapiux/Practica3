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
      <View style={styles.innerContainer}>
        <Text style={styles.title}>ConnectMe Register</Text>
        <Text style={styles.infoText}>Inicia tu registro con nosotros</Text>

        <View style={styles.inputFieldLabel}>
          <Text style={styles.label}>ID</Text>
          <TextInput style={styles.input} onChangeText={setUserID} placeholder="Ingresa tu ID" />
        </View>

        <View style={styles.inputFieldLabel}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput style={styles.input} onChangeText={setUsername} placeholder="Ingresa tu usuario" />
        </View>

        <View style={styles.inputFieldLabel}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} onChangeText={setFirsname} placeholder="Ingresa tu nombre" />
        </View>

        <View style={styles.inputFieldLabel}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput style={styles.input} onChangeText={setLastname} placeholder="Ingresa tu apellido" />
        </View>

        <View style={styles.inputFieldLabel}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} onChangeText={setEmail} placeholder="Ingresa tu email" />
        </View>

        <View style={styles.inputFieldLabel}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput style={styles.input} secureTextEntry={true} onChangeText={setPassword} placeholder="Ingresa tu contraseña" />
        </View>

        {failedRegister && <Text style={styles.error}>Registro fallido, intenta de nuevo</Text>}

        <Pressable style={styles.buttonWithIcon} onPress={onButtonBackIndex}>
			    <Text style={styles.buttonText}>Aceptar</Text>
			  </Pressable>

        <Link href="/" style={styles.buttonText} asChild>
          <Text style={styles.buttonWithIcon}>Cancelar</Text>
        </Link>
      </View>
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
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
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
    textAlign: "center",
    textTransform: "uppercase",
  },
});
