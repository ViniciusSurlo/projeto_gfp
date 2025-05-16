
// AsyncStorage.removeItem('UsuarioLogado')
import {Text, View, Button } from 'react-native';
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
        <Text style={{fontSize:20, marginLeft:10}}>Usuário: {usuario?.nome}</Text>
        <Button title='Sair' onPress={botaoLogout}/>
      </View>
      <Text>Principal</Text>
    </View>
  );

}