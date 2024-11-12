// Pantalla de mainmenu de pruebas
/*import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useContext } from "react";
import { MyContext } from "./Context";

export default function Perfil() {
  const { loginData } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.greeting}>Estamos en arreglando la pagina</Text>
      </View>
    </View>
  );
}*/  

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

/*
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
});*/


import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MyContext } from "./Context";
import { Endpoints } from "../constants/Endpoint";

export default function Perfil() {
  const { loginData, updateProfilePicture } = useContext(MyContext);
  const [selectedImage, setSelectedImage] = useState(null);

  // Pedimos los permisos correspondientes de acceso a la galería y la cámara
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert("Permiso requerido", "Se necesitan permisos para usar la cámara y la galería.");
      return false;
    }
    return true;
  };

  // aquí seleccionamos una imagen desde la galería con expo-image-picker
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // aquí tomamos una foto con la cámara con expo-image-picker
  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // aquí se manda la imágen ya sea tomada o de la galeria al endpoint 
  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Por favor selecciona una imagen primero.");
      return;
    }

    //Se hizo con el formato solicitado del token, id y la imagen en si
    const formData = new FormData();
    formData.append("token", "code37");
    formData.append("Id", loginData.id);
    formData.append("image", {
      uri: selectedImage,
      name: "profile.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(Endpoints.SET_PROFILE_PICTURE, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        updateProfilePicture(selectedImage);
        Alert.alert("Éxito", "Foto de perfil actualizada correctamente.");
      } else {
        Alert.alert("Error", "No se pudo actualizar la foto de perfil.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al subir la imagen.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.greeting}>Perfil de {loginData.username}</Text>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.pfpImage} />
        ) : (
          <Text style={styles.info}>Selecciona una imagen para tu perfil</Text>
        )}
        <Button title="Seleccionar Imagen" onPress={pickImage} />
        <Button title="Tomar Foto" onPress={takePhoto} color="#841584" />
        <Button title="Subir Imagen" onPress={uploadImage} color="#841584" />
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
});
