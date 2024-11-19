import { View, Text, Image, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { MyContext } from "./Context";

export default function Perfil() {
  const { loginData } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.greeting}>Bienvenido, {loginData.firstname}!</Text>

        {/* Mostrar la imagen de perfil o una imagen por defecto */}
        <Link href="/CambiarFoto">
          <Image
            style={styles.pfpImage}
            source={{
              uri: loginData.pfp_url || "https://via.placeholder.com/180",
            }}
          />
        </Link>

        <Text style={styles.info}>ID: {loginData.id}</Text>
        <Text style={styles.info}>
          {loginData.firstname} {loginData.lastname}
        </Text>
        <Text style={styles.info}>Correo: {loginData.email}</Text>
        <Text style={styles.info}>{loginData.credits} credits!</Text>
        <Text style={styles.info}>{loginData.xp} XP!</Text>
      </View>

      <View style={styles.footer}>
        <Link href="/creditos">
          <Text style={styles.footerText}>¡Conoce el Equipo ConnectMe Aquí!</Text>
        </Link>
      </View>

      <View style={styles.logoutButton}>
        <Link href="/">
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFC900",
  },
  profile: {
    backgroundColor: "#90A8ED",
    width: 340,
    padding: 20,
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 8,
    alignItems: "center",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "900",
    color: "#000",
    marginBottom: 10,
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
    backgroundColor: "#FF90E8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
