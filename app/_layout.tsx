import { Stack } from "expo-router";
import { MyContextProvider } from "./Context";

export default function RootLayout() {
  return (
    //Se anidan las pantallas en el mismo contexto
    //MyContextProvider se utiliza para proveer el contexto a
    //los elementos definidos por JSX
    <MyContextProvider> 
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="mainmenu" />
        <Stack.Screen name="register"  options={{headerShown: false}} />
        <Stack.Screen name="credits" />
      </Stack>
    </MyContextProvider>

  );
}
