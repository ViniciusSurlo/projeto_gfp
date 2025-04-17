import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
// import { NavigationContainer } from "@react-navigation/native";

const drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
            <drawer.Navigator>
                <drawer.Screen name="Principal" component={Principal} />
            </drawer.Navigator>

        
    )
}