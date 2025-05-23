import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Estilos, { corPrincipal, corSecundaria } from '../styles/Estilos';
// import { NavigationContainer } from "@react-navigation/native";

import Contas from "./contas";
import Categorias from "./Categorias";
const drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
            <drawer.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: corPrincipal,
                        elevation: 0,
                    },
                    headerTintColor: '#fff',
                }}
            >
                <drawer.Screen name="Principal" component={Principal} />
                <drawer.Screen name="Contas" component={Contas} />
                <drawer.Screen name="Categorias" component={Categorias} />
            </drawer.Navigator>

        
    )
}