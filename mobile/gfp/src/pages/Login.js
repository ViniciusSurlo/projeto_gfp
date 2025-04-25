import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Estilos from '../styles/Estilos';
import { enderecoServidor } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
export default function Login({ navigation }) {
  navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function botaoEntrar() {
    try {
      if (email == "" || senha == "") {
        throw new Error("Preencha todos os campos!");
      }
      // Autenticando utilizando a API de backend com o fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            email: email,
            senha: senha
        })
      });

      if(resposta.ok){
        const dados = await resposta.json()
        // Ou navegar para outra página
        AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados))
        navigation.navigate('MenuPrincipal')
      } else {
        throw new Error('Email ou senha incorretos ❌')
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert(error.message);
      return;
    }
  }

  return (
    <View style={Estilos.conteudo}>
      <View style={Estilos.loginContainer}>
        <View style={Estilos.iconContainer}>
          <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>GFP</Text>
        </View>

        <Text style={Estilos.label}>Email</Text>
        <TextInput placeholder="Digite seu Email" placeholderTextColor="#ccc" style={Estilos.input}
        onChangeText={setEmail} value={email} 
        />

        <Text style={Estilos.label}>Senha</Text>
        <TextInput placeholder="Digite sua senha" placeholderTextColor="#ccc" secureTextEntry style={Estilos.input} 
        onChangeText={setSenha} value={senha} 
        />

        <TouchableOpacity style={Estilos.button} onPress={botaoEntrar}>
          <Text style={Estilos.buttonText}>LOGIN</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
