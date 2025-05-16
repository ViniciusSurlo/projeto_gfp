import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Estilos, { corPrincipal, corSecundaria } from '../styles/Estilos';
// import { NavigationContainer } from "@react-navigation/native";

import Contas from "./contas";
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
            </drawer.Navigator>

        
    )
}