import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Estilos from '../styles/Estilos';

export default function Login({ navigation }) {
  return (
    <View style={Estilos.conteudo}>
      <View style={Estilos.loginContainer}>
        <View style={Estilos.iconContainer}>
          <Text style={{ fontSize: 40, color: 'white' }}>👤</Text>
        </View>

        <Text style={Estilos.label}>Username</Text>
        <TextInput placeholder="Digite seu usuário" placeholderTextColor="#ccc" style={Estilos.input} />

        <Text style={Estilos.label}>Password</Text>
        <TextInput placeholder="Digite sua senha" placeholderTextColor="#ccc" secureTextEntry style={Estilos.input} />

        <TouchableOpacity style={Estilos.button} onPress={() => navigation.navigate('MenuDrawer')}>
          <Text style={Estilos.buttonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
