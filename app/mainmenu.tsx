// Pantalla de mainmenu de pruebas
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { MyContext } from "./Context";

export default function Perfil() {
  const { loginData } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.greeting}>Bienvenido, {loginData.firstname}!</Text>
        
        <Link href="/CambiarFoto">
          <Image style={styles.pfpImage} source={{ uri: loginData.pfp_url }} />
        </Link>

        <Text style={styles.info}>ID: {loginData.id}</Text>
        <Text style={styles.info}>{loginData.firstname} {loginData.lastname}</Text>
        <Text style={styles.info}>Correo: {loginData.email}</Text>
        <Text style={styles.info}>{loginData.credits} credits!</Text>
        <Text style={styles.info}>{loginData.xp} XP!</Text>
      </View>

      <View style={styles.footer}>
        <Link href="/creditos">
          <Text style={styles.footerText}>¡Conoce el Equipo ConnectMe Aquí!</Text>
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
  profile: {
    backgroundColor: "#90A8ED", // Fondo azul claro del perfil
    width: 340,
    padding: 20,
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  info: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 5,
  },
  pfpImage: {
    width: 180,
    height: 180,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: "#000",
    marginTop: 15,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#FF90E8", // Amarillo intenso para el footer
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  footerText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
});