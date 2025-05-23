
// AsyncStorage.removeItem('UsuarioLogado')
import {Text, View, Button, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Principal({ navigation }) {
  const [usuario, setUsuario] = useState();

  const botaoLogout = async () => {
    AsyncStorage.removeItem('UsuarioLogado')
    navigation.navigate('Login')    
  }
  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      const UsuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
      if (UsuarioLogado){
        setUsuario(JSON.parse(UsuarioLogado));
        console.log(UsuarioLogado);
        
      } else {
        navigation.navigate('Login');
      }
    }

    buscarUsuarioLogado();
  }, []);
  
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {/* <Text style={{}}>Bem vindo! {usuario?.nome}</Text> */}
        <Text style={{fontSize:20, marginLeft:10, marginTop: 20, fontWeight: 'bold'}}>Bem vindo! {usuario?.nome}</Text>
        {/* <Button title='Sair' onPress={botaoLogout}/> */}
        <TouchableOpacity onPress={botaoLogout} style={{marginRight: 10, backgroundColor: '#00C896', padding: 10, borderRadius: 10, marginTop: 20, width: 70, alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: "#fff", fontWeight: 'bold'}}>Sair</Text>
        </TouchableOpacity>
      </View>
      <Text style={{textAlign: 'center', marginTop: 40, fontWeight: 'bold', fontSize: 20}}>Principal</Text>
    </View>
  );

}