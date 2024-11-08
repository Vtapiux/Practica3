//Pantalla de mainmenu de pruebas
import {View, Text, Image, StyleSheet} from "react-native";
import {Link, router} from "expo-router";
import { useContext, useState } from "react";
import { MyContext } from "./Context";

export default function Index()
{
  const {loginData, setLoginData}=useContext(MyContext);
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text>Welcome back {loginData.firstname}!</Text>
        <Image style={styles.pfp_image}
          source={{uri:loginData.pfp_url}}></Image>
      </View>

      <View style={styles.footer}>
        <Link href="/creditos">
          <Text>Made with ❤️ by ConnectMe Team</Text>
        </Link>
      </View>

    </View>
  )
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
    }
  }
)