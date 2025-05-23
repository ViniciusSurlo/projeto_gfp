import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/Login";
import MenuDrawer from "./src/pages/MenuDrawer";
import cadContas from "./src/pages/cadContas";
import Estilos, { corPrincipal, corSecundaria } from './src/styles/Estilos';
import CadCategorias from "./src/pages/cadCategorias";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: corPrincipal,
            elevation: 0,
          },
          headerTintColor: "#fff",
          // headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MenuPrincipal" component={MenuDrawer} 
        options={{headerShown:false}}/>
        <Stack.Screen
          name="CadContas"
          component={cadContas}
          options={{ title: "Cadastro de Contas" }}
        />
        <Stack.Screen
          name="CadCategorias"
          component={CadCategorias}
          options={{ title: "Cadastro de Categorias" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
