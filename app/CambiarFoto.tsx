import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MyContext } from "./Context";

export default function CambiarFoto() {
  const { updateProfilePicture } = useContext(MyContext);
  const [selectedImage, setSelectedImage] = useState(null);

  // Permisos para acceder a la cámara y galería
  const requestPermissions = async () => {
    console.log("Solicitando permisos para cámara y galería...");
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log("Estado de permisos:", {
      cameraPermission: JSON.stringify(cameraPermission),
      mediaPermission: JSON.stringify(mediaPermission),
    });

    if (cameraPermission.status !== "granted" || mediaPermission.status !== "granted") {
      console.warn("Permisos no otorgados para cámara o galería.");
      Alert.alert(
        "Permiso requerido",
        "Se necesitan permisos para usar la cámara y la galería."
      );
      return false;
    }
    console.log("Permisos otorgados para cámara y galería.");
    return true;
  };

  // Seleccionar una imagen de la galería
  const pickImage = async () => {
    console.log("Intentando seleccionar imagen de la galería...");
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.warn("No se pudo seleccionar imagen por falta de permisos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Resultado de la selección de imagen:", JSON.stringify(result));

    if (!result.canceled) {
      console.log("Imagen seleccionada con éxito:", JSON.stringify(result.assets[0]));
      setSelectedImage(result.assets[0].uri);
    } else {
      console.warn("Selección de imagen cancelada por el usuario.");
    }
  };

  // Tomar una foto con la cámara
  const takePhoto = async () => {
    console.log("Intentando tomar fotografía con la cámara...");
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.warn("No se pudo tomar fotografía por falta de permisos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Resultado de la toma de fotografía:", JSON.stringify(result));

    if (!result.canceled) {
      console.log("Fotografía tomada con éxito:", JSON.stringify(result.assets[0]));
      setSelectedImage(result.assets[0].uri);
    } else {
      console.warn("Captura de fotografía cancelada por el usuario.");
    }
  };

  // Guardar la imagen seleccionada o tomada
  const saveImage = () => {
    console.log("Intentando guardar imagen...");
    if (!selectedImage) {
      console.error("Error: No se seleccionó ninguna imagen.");
      Alert.alert("Error", "Por favor selecciona una imagen primero.");
      return;
    }

    console.log("Guardando imagen seleccionada:", JSON.stringify({ uri: selectedImage }));
    updateProfilePicture(selectedImage); // Actualizar el estado global
    Alert.alert("Éxito", "Foto de perfil actualizada correctamente.");
    console.log("Foto de perfil actualizada con éxito.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Foto de Perfil</Text>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.pfpImage} />
      ) : (
        <Text style={styles.info}>Selecciona o toma una fotografía para tu perfil</Text>
      )}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      <Button title="Tomar Fotografía" onPress={takePhoto} color="#841584" />
      <Button title="Guardar Imagen" onPress={saveImage} color="#0000FF" />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pfpImage: {
    width: 180,
    height: 180,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
});
