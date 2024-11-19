/*import {createContext, useState } from "react";
//Context es un objeto que nos permite pasar datos entre
//pantallas, o tener un "contexto global" donde podremos
//leer y almacenar variables
export const MyContext = createContext({
  loginData:{},
  setLoginData:()=>{},
});

export const MyContextProvider = ({children}) =>{
  const[loginData, setLoginData] = useState({});
  return (
    <MyContext.Provider value = {{loginData, setLoginData}}>
      {children}
    </MyContext.Provider>
  );
};

export const AuthContext = createContext({
  registerUser:{},
  setRegisterUser:()=>{},
});

export const AuthContextProvider = ({children}) =>{
  const[registerUser, setRegisterUser] = useState({});
  return (
    <AuthContext.Provider value = {{registerUser, setRegisterUser}}>
      {children}
    </AuthContext.Provider>
  );
};*/

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crear contexto global
export const MyContext = createContext({
  loginData: {},
  setLoginData: () => {},
  updateProfilePicture: () => {},
});

export const MyContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({});

  // Guardar los datos en AsyncStorage
  const saveLoginData = async (data) => {
    try {
      await AsyncStorage.setItem("loginData", JSON.stringify(data));
    } catch (error) {
      console.error("Error al guardar los datos en AsyncStorage:", error);
    }
  };

  // Cargar los datos desde AsyncStorage al iniciar
  const loadLoginData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("loginData");
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error("Error al cargar los datos desde AsyncStorage:", error);
      return {};
    }
  };

  useEffect(() => {
    loadLoginData().then((data) => {
      setLoginData(data);
    });
  }, []);

  // Actualizar la imagen de perfil
  const updateProfilePicture = async (newUrl) => {
    const updatedData = { ...loginData, pfp_url: newUrl };
    setLoginData(updatedData);
    await saveLoginData(updatedData); // Guardar cambios en AsyncStorage
  };

  return (
    <MyContext.Provider
      value={{ loginData, setLoginData, updateProfilePicture }}
    >
      {children}
    </MyContext.Provider>
  );
};

