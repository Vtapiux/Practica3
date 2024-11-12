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


import { createContext, useState } from "react";

// Context para datos de login
export const MyContext = createContext({
  loginData: {},
  setLoginData: () => {},
  updateProfilePicture: () => {}, // esta es la función para actualizar la foto de perfil
});

export const MyContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({});

  // se añadió la función para actualizar la imagen de perfil dependiendo de la que se haya subido en el cambiarfoto
  const updateProfilePicture = (newUrl) => {
    setLoginData((prevData) => ({
      ...prevData,
      pfp_url: newUrl, // Actualiza solo la URL de la imagen de perfil
    }));
  };

  return (
    <MyContext.Provider value={{ loginData, setLoginData, updateProfilePicture }}>
      {children}
    </MyContext.Provider>
  );
};

// Context para datos de registro
export const AuthContext = createContext({
  registerUser: {},
  setRegisterUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [registerUser, setRegisterUser] = useState({});

  return (
    <AuthContext.Provider value={{ registerUser, setRegisterUser }}>
      {children}
    </AuthContext.Provider>
  );
};
