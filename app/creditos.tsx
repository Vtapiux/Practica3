// Pantalla de créditos con formato mejorado
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Credits() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.greeting}>Equipo ConnectMe</Text>
        <Text style={styles.info}>Grupo 901CIB</Text>
        <Text style={styles.info}>------ Equipo ------</Text>
        <Text style={styles.info}>Emiliano Jorge García Vázquez</Text>
        <Text style={styles.info}>Marco Antonio Graciano Ortíz</Text>
        <Text style={styles.info}>Valeria Tapia</Text>
      </View>

      <View style={styles.footer}>
      <Link href="/mainmenu">
        <Text style={styles.footerText}>Perfil Usuario</Text>
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

